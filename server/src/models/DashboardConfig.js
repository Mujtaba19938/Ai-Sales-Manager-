import supabase from '../config/db.js';

const TABLE = 'dashboard_configs';

const DashboardConfig = {
  async findByConfigId(configId = 'default') {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .eq('config_id', configId)
      .single();
    if (error && error.code === 'PGRST116') return null; // not found
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

  async upsert(configId = 'default', values) {
    const { data, error } = await supabase
      .from(TABLE)
      .upsert({ config_id: configId, ...values }, { onConflict: 'config_id' })
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};

export default DashboardConfig;
