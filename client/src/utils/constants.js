export const WIDGET_REGISTRY = {
  'stat-revenue': { title: 'Total Revenue', component: 'StatCard', defaultSize: { w: 3, h: 2 }, props: { metric: 'totalRevenue', format: 'currency', icon: 'DollarSign', color: '#22c55e' } },
  'stat-profit': { title: 'Net Profit', component: 'StatCard', defaultSize: { w: 3, h: 2 }, props: { metric: 'netProfit', format: 'currency', icon: 'TrendingUp', color: '#22c55e' } },
  'stat-expenses': { title: 'Total Expenses', component: 'StatCard', defaultSize: { w: 3, h: 2 }, props: { metric: 'totalExpenses', format: 'currency', icon: 'CreditCard', color: '#0f172a' } },
  'stat-margin': { title: 'Gross Margin', component: 'StatCard', defaultSize: { w: 3, h: 2 }, props: { metric: 'grossMargin', format: 'percent', icon: 'Percent', color: '#0f172a' } },
  'chart-trend': { title: 'Sales Trend', component: 'SalesTrendChart', defaultSize: { w: 6, h: 4 } },
  'chart-profitloss': { title: 'Profit vs Expenses', component: 'ProfitLossChart', defaultSize: { w: 6, h: 4 } },
  'chart-categories': { title: 'Sales by Category', component: 'CategoryBreakdown', defaultSize: { w: 4, h: 4 } },
  'chart-expenses': { title: 'Expense Breakdown', component: 'ExpenseBreakdown', defaultSize: { w: 4, h: 4 } },
  'chart-margins': { title: 'Profit Margins', component: 'MarginsChart', defaultSize: { w: 6, h: 4 } },
  'chart-growth': { title: 'Growth Rate', component: 'GrowthRateChart', defaultSize: { w: 6, h: 4 } },
  'breakeven': { title: 'Break-Even Analysis', component: 'BreakEvenWidget', defaultSize: { w: 4, h: 3 } },
  'recent-sales': { title: 'Recent Sales', component: 'RecentSalesTable', defaultSize: { w: 6, h: 4 } },
};

export const DEFAULT_ACTIVE_WIDGETS = [
  'stat-revenue', 'stat-profit', 'stat-expenses', 'stat-margin',
  'chart-trend', 'chart-profitloss', 'chart-categories',
  'chart-expenses', 'recent-sales',
];

export const DEFAULT_LAYOUT = {
  lg: [
    { i: 'stat-revenue', x: 0, y: 0, w: 3, h: 2 },
    { i: 'stat-profit', x: 3, y: 0, w: 3, h: 2 },
    { i: 'stat-expenses', x: 6, y: 0, w: 3, h: 2 },
    { i: 'stat-margin', x: 9, y: 0, w: 3, h: 2 },
    { i: 'chart-trend', x: 0, y: 2, w: 6, h: 4 },
    { i: 'chart-profitloss', x: 6, y: 2, w: 6, h: 4 },
    { i: 'chart-categories', x: 0, y: 6, w: 4, h: 4 },
    { i: 'chart-expenses', x: 4, y: 6, w: 4, h: 4 },
    { i: 'recent-sales', x: 8, y: 6, w: 4, h: 4 },
  ],
};

export const EXPENSE_CATEGORIES = [
  'rent', 'utilities', 'salaries', 'marketing', 'insurance',
  'supplies', 'maintenance', 'software', 'travel', 'other',
];

export const COLOR_PRESETS = [
  '#22c55e',
];

export const CHART_COLORS = [
  '#22c55e', '#16a34a', '#0f172a', '#1e293b', '#334155',
  '#15803d', '#166534', '#475569', '#64748b', '#94a3b8',
];
