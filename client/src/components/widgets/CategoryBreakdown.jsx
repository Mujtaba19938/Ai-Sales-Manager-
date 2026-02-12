import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { CHART_COLORS } from '../../utils/constants';

export default function CategoryBreakdown({ categories = [] }) {
  if (!categories.length) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-secondary)', fontSize: 13 }}>No sales data</div>;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={categories}
          dataKey="revenue"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius="70%"
          label={({ name, percentage }) => `${name} ${percentage}%`}
          labelLine={{ stroke: 'var(--text-secondary)' }}
          style={{ fontSize: 11 }}
        >
          {categories.map((_, i) => (
            <Cell key={i} fill={categories[i]?.color || CHART_COLORS[i % CHART_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: 'var(--bg-card)', border: '1px solid var(--border-color)',
            borderRadius: 8, fontSize: 12,
          }}
          formatter={(v) => [`$${v.toLocaleString()}`, undefined]}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
