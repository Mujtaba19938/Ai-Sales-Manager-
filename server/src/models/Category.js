import supabase from '../config/db.js';

const TABLE = 'categories';

const Category = {
  async find(sort = { column: 'name', ascending: true }) {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .order(sort.column, { ascending: sort.ascending });
    if (error) throw error;
    return data;
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
    const { error } = await supabase
      .from(TABLE)
      .delete()
      .eq('id', id);
    if (error) throw error;
    return true;
  },
};

export default Category;
