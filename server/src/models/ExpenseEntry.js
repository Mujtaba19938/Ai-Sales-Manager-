import supabase from '../config/db.js';

const TABLE = 'expense_entries';

const ExpenseEntry = {
  async find(filter = {}, { page = 1, limit = 50 } = {}) {
    let countQuery = supabase.from(TABLE).select('*', { count: 'exact', head: true });
    let query = supabase.from(TABLE).select('*');

    if (filter.startDate) {
      countQuery = countQuery.gte('date', filter.startDate);
      query = query.gte('date', filter.startDate);
    }
    if (filter.endDate) {
      countQuery = countQuery.lte('date', filter.endDate);
      query = query.lte('date', filter.endDate);
    }
    if (filter.category) {
      countQuery = countQuery.eq('category', filter.category);
      query = query.eq('category', filter.category);
    }

    const { count } = await countQuery;

    const from = (page - 1) * limit;
    const to = from + limit - 1;
    const { data, error } = await query
      .order('date', { ascending: false })
      .range(from, to);

    if (error) throw error;
    return { data, total: count, page, limit };
  },

  async findById(id) {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(values) {
    const { data, error } = await supabase
      .from(TABLE)
      .insert(values)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, values) {
    const { data, error } = await supabase
      .from(TABLE)
      .update(values)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
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
    let query = supabase.from(TABLE).select('*');
    if (filter.startDate) query = query.gte('date', filter.startDate);
    if (filter.endDate) query = query.lte('date', filter.endDate);
    const { data, error } = await query.order('date', { ascending: false });
    if (error) throw error;
    return data;
  },
};

export default ExpenseEntry;
