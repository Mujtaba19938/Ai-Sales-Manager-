import supabase from '../config/db.js';

const TABLE = 'products';

const Product = {
  async find(filter = {}, sort = { column: 'name', ascending: true }) {
    let query = supabase
      .from(TABLE)
      .select('*, category:categories(id, name, color)');

    if (filter.category_id) query = query.eq('category_id', filter.category_id);
    if (filter.is_active !== undefined) query = query.eq('is_active', filter.is_active);

    const { data, error } = await query.order(sort.column, { ascending: sort.ascending });
    if (error) throw error;
    return data;
  },

  async findById(id) {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*, category:categories(id, name, color)')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(values) {
    const { data, error } = await supabase
      .from(TABLE)
      .insert(values)
      .select('*, category:categories(id, name, color)')
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, values) {
    const { data, error } = await supabase
      .from(TABLE)
      .update(values)
      .eq('id', id)
      .select('*, category:categories(id, name, color)')
      .single();
    if (error) throw error;
    return data;
  },

  async softDelete(id) {
    return this.update(id, { is_active: false });
  },
};

export default Product;
