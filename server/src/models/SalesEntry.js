import supabase from '../config/db.js';

const TABLE = 'sales_entries';
const SELECT_WITH_JOINS = '*, product:products(id, name, sku), category:categories(id, name, color)';

function addComputedFields(entry) {
  if (!entry) return entry;
  const revenue = (entry.quantity * entry.unit_price) - entry.discount;
  const totalCost = entry.quantity * entry.unit_cost;
  return { ...entry, revenue, totalCost, grossProfit: revenue - totalCost };
}

const SalesEntry = {
  async find(filter = {}, { page = 1, limit = 50 } = {}) {
    let countQuery = supabase.from(TABLE).select('*', { count: 'exact', head: true });
    let query = supabase.from(TABLE).select(SELECT_WITH_JOINS);

    if (filter.startDate) {
      countQuery = countQuery.gte('date', filter.startDate);
      query = query.gte('date', filter.startDate);
    }
    if (filter.endDate) {
      countQuery = countQuery.lte('date', filter.endDate);
      query = query.lte('date', filter.endDate);
    }
    if (filter.category_id) {
      countQuery = countQuery.eq('category_id', filter.category_id);
      query = query.eq('category_id', filter.category_id);
    }
    if (filter.product_id) {
      countQuery = countQuery.eq('product_id', filter.product_id);
      query = query.eq('product_id', filter.product_id);
    }

    const { count } = await countQuery;

    const from = (page - 1) * limit;
    const to = from + limit - 1;
    const { data, error } = await query
      .order('date', { ascending: false })
      .range(from, to);

    if (error) throw error;
    return { data: data.map(addComputedFields), total: count, page, limit };
  },

  async findById(id) {
    const { data, error } = await supabase
      .from(TABLE)
      .select(SELECT_WITH_JOINS)
      .eq('id', id)
      .single();
    if (error) throw error;
    return addComputedFields(data);
  },

  async create(values) {
    const { data, error } = await supabase
      .from(TABLE)
      .insert(values)
      .select(SELECT_WITH_JOINS)
      .single();
    if (error) throw error;
    return addComputedFields(data);
  },

  async update(id, values) {
    const { data, error } = await supabase
      .from(TABLE)
      .update(values)
      .eq('id', id)
      .select(SELECT_WITH_JOINS)
      .single();
    if (error) throw error;
    return addComputedFields(data);
  },

  async delete(id) {
    const { data, error } = await supabase
      .from(TABLE)
      .delete()
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async findRaw(filter = {}) {
    let query = supabase.from(TABLE).select('*, product:products(id, name), category:categories(id, name)');
    if (filter.startDate) query = query.gte('date', filter.startDate);
    if (filter.endDate) query = query.lte('date', filter.endDate);
    const { data, error } = await query.order('date', { ascending: false });
    if (error) throw error;
    return data;
  },
};

export default SalesEntry;
