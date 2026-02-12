import supabase from '../config/db.js';

// Helper to build filtered queries
function applyDateFilter(query, startDate, endDate) {
  if (startDate) query = query.gte('date', startDate);
  if (endDate) query = query.lte('date', endDate);
  return query;
}

export async function getSummary(startDate, endDate) {
  let salesQuery = supabase.from('sales_entries').select('quantity, unit_price, unit_cost, discount');
  salesQuery = applyDateFilter(salesQuery, startDate, endDate);
  const { data: sales, error: salesErr } = await salesQuery;
  if (salesErr) throw salesErr;

  let expQuery = supabase.from('expense_entries').select('amount');
  expQuery = applyDateFilter(expQuery, startDate, endDate);
  const { data: expenses, error: expErr } = await expQuery;
  if (expErr) throw expErr;

  let totalRevenue = 0, totalCOGS = 0, totalUnits = 0;
  for (const s of sales) {
    totalRevenue += (s.quantity * s.unit_price) - s.discount;
    totalCOGS += s.quantity * s.unit_cost;
    totalUnits += s.quantity;
  }
  const entryCount = sales.length;

  let totalExpenses = 0;
  for (const e of expenses) {
    totalExpenses += e.amount;
  }

  const grossProfit = totalRevenue - totalCOGS;
  const operatingProfit = grossProfit - totalExpenses;
  const netProfit = operatingProfit;

  const grossMargin = totalRevenue > 0 ? +((grossProfit / totalRevenue) * 100).toFixed(2) : 0;
  const operatingMargin = totalRevenue > 0 ? +((operatingProfit / totalRevenue) * 100).toFixed(2) : 0;
  const netMargin = totalRevenue > 0 ? +((netProfit / totalRevenue) * 100).toFixed(2) : 0;

  const avgUnitPrice = totalUnits > 0 ? totalRevenue / totalUnits : 0;
  const avgUnitCost = totalUnits > 0 ? totalCOGS / totalUnits : 0;
  const contributionMargin = avgUnitPrice - avgUnitCost;
  const breakEvenUnits = contributionMargin > 0 ? Math.ceil(totalExpenses / contributionMargin) : null;
  const breakEvenRevenue = breakEvenUnits ? +(breakEvenUnits * avgUnitPrice).toFixed(2) : null;

  return {
    totalRevenue: +totalRevenue.toFixed(2),
    totalCOGS: +totalCOGS.toFixed(2),
    grossProfit: +grossProfit.toFixed(2),
    totalExpenses: +totalExpenses.toFixed(2),
    operatingProfit: +operatingProfit.toFixed(2),
    netProfit: +netProfit.toFixed(2),
    grossMargin,
    operatingMargin,
    netMargin,
    totalUnits,
    entryCount,
    breakEvenUnits,
    breakEvenRevenue,
    avgUnitPrice: +avgUnitPrice.toFixed(2),
    avgUnitCost: +avgUnitCost.toFixed(2),
  };
}

export async function getGrowthRate(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const periodMs = end - start;
  const priorStart = new Date(start.getTime() - periodMs);

  const { data: currentSales, error: e1 } = await supabase
    .from('sales_entries')
    .select('quantity, unit_price, discount')
    .gte('date', start.toISOString())
    .lte('date', end.toISOString());
  if (e1) throw e1;

  const { data: priorSales, error: e2 } = await supabase
    .from('sales_entries')
    .select('quantity, unit_price, discount')
    .gte('date', priorStart.toISOString())
    .lt('date', start.toISOString());
  if (e2) throw e2;

  let current = 0;
  for (const s of currentSales) current += (s.quantity * s.unit_price) - s.discount;

  let prior = 0;
  for (const s of priorSales) prior += (s.quantity * s.unit_price) - s.discount;

  const growthRate = prior > 0 ? +(((current - prior) / prior) * 100).toFixed(2) : null;
  return { currentRevenue: current, priorRevenue: prior, growthRate };
}

export async function getTrends(startDate, endDate, granularity = 'monthly') {
  let salesQuery = supabase.from('sales_entries').select('date, quantity, unit_price, unit_cost, discount');
  salesQuery = applyDateFilter(salesQuery, startDate, endDate);
  const { data: sales, error: e1 } = await salesQuery;
  if (e1) throw e1;

  let expQuery = supabase.from('expense_entries').select('date, amount');
  expQuery = applyDateFilter(expQuery, startDate, endDate);
  const { data: expenses, error: e2 } = await expQuery;
  if (e2) throw e2;

  function getPeriodKey(dateStr) {
    const d = new Date(dateStr);
    if (granularity === 'daily') {
      return d.toISOString().split('T')[0];
    } else if (granularity === 'weekly') {
      const year = d.getFullYear();
      const oneJan = new Date(year, 0, 1);
      const week = Math.ceil(((d - oneJan) / 86400000 + oneJan.getDay() + 1) / 7);
      return `${year}-W${String(week).padStart(2, '0')}`;
    } else {
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    }
  }

  // Group sales by period
  const salesMap = {};
  for (const s of sales) {
    const period = getPeriodKey(s.date);
    if (!salesMap[period]) salesMap[period] = { revenue: 0, cogs: 0, units: 0 };
    salesMap[period].revenue += (s.quantity * s.unit_price) - s.discount;
    salesMap[period].cogs += s.quantity * s.unit_cost;
    salesMap[period].units += s.quantity;
  }

  // Group expenses by period
  const expenseMap = {};
  for (const e of expenses) {
    const period = getPeriodKey(e.date);
    expenseMap[period] = (expenseMap[period] || 0) + e.amount;
  }

  const periods = [...new Set([...Object.keys(salesMap), ...Object.keys(expenseMap)])].sort();

  return periods.map(period => {
    const s = salesMap[period] || { revenue: 0, cogs: 0, units: 0 };
    const exp = expenseMap[period] || 0;
    const profit = +(s.revenue - s.cogs).toFixed(2);
    return {
      period,
      revenue: +s.revenue.toFixed(2),
      cogs: +s.cogs.toFixed(2),
      profit,
      units: s.units,
      expenses: +exp.toFixed(2),
      netProfit: +(profit - exp).toFixed(2),
    };
  });
}

export async function getCategoryBreakdown(startDate, endDate) {
  let query = supabase.from('sales_entries').select('quantity, unit_price, unit_cost, discount, category:categories(name, color)');
  query = applyDateFilter(query, startDate, endDate);
  const { data: sales, error } = await query;
  if (error) throw error;

  const catMap = {};
  for (const s of sales) {
    const catName = s.category?.name || 'Unknown';
    if (!catMap[catName]) catMap[catName] = { color: s.category?.color || '#6366f1', revenue: 0, cogs: 0, units: 0 };
    catMap[catName].revenue += (s.quantity * s.unit_price) - s.discount;
    catMap[catName].cogs += s.quantity * s.unit_cost;
    catMap[catName].units += s.quantity;
  }

  const breakdown = Object.entries(catMap)
    .map(([name, data]) => ({
      name,
      color: data.color,
      revenue: +data.revenue.toFixed(2),
      cogs: +data.cogs.toFixed(2),
      profit: +(data.revenue - data.cogs).toFixed(2),
      units: data.units,
    }))
    .sort((a, b) => b.revenue - a.revenue);

  const totalRevenue = breakdown.reduce((s, c) => s + c.revenue, 0);
  return breakdown.map(c => ({ ...c, percentage: totalRevenue > 0 ? +((c.revenue / totalRevenue) * 100).toFixed(1) : 0 }));
}

export async function getExpenseBreakdown(startDate, endDate) {
  let query = supabase.from('expense_entries').select('category, amount');
  query = applyDateFilter(query, startDate, endDate);
  const { data: expenses, error } = await query;
  if (error) throw error;

  const catMap = {};
  for (const e of expenses) {
    if (!catMap[e.category]) catMap[e.category] = { amount: 0, count: 0 };
    catMap[e.category].amount += e.amount;
    catMap[e.category].count += 1;
  }

  const breakdown = Object.entries(catMap)
    .map(([category, data]) => ({
      category,
      amount: +data.amount.toFixed(2),
      count: data.count,
    }))
    .sort((a, b) => b.amount - a.amount);

  const total = breakdown.reduce((s, e) => s + e.amount, 0);
  return breakdown.map(e => ({ ...e, percentage: total > 0 ? +((e.amount / total) * 100).toFixed(1) : 0 }));
}

export async function getFullAnalytics(startDate, endDate) {
  const [summary, growth, categoryBreakdown, expenseBreakdown, trends] = await Promise.all([
    getSummary(startDate, endDate),
    startDate && endDate ? getGrowthRate(startDate, endDate) : Promise.resolve({ growthRate: null }),
    getCategoryBreakdown(startDate, endDate),
    getExpenseBreakdown(startDate, endDate),
    getTrends(startDate, endDate, 'monthly'),
  ]);

  return {
    ...summary,
    growthRate: growth.growthRate,
    categoryBreakdown,
    expenseBreakdown,
    monthlyTrend: trends,
    dateRange: startDate && endDate ? `${startDate} to ${endDate}` : 'All time',
  };
}
