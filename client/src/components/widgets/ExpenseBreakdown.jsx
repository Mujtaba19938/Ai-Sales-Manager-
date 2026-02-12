import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { CHART_COLORS } from '../../utils/constants';

export default function ExpenseBreakdown({ expenses = [] }) {
  if (!expenses.length) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-secondary)', fontSize: 13 }}>No expense data</div>;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={expenses}
          dataKey="amount"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius="70%"
          label={({ category, percentage }) => `${category} ${percentage}%`}
          labelLine={{ stroke: 'var(--text-secondary)' }}
          style={{ fontSize: 11 }}
        >
          {expenses.map((_, i) => (
            <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
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
