import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function MarginsChart({ data }) {
  if (!data) return null;

  const chartData = [
    { name: 'Gross Margin', value: data.grossMargin || 0, fill: '#22c55e' },
    { name: 'Operating Margin', value: data.operatingMargin || 0, fill: '#0f172a' },
    { name: 'Net Margin', value: data.netMargin || 0, fill: '#16a34a' },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
        <XAxis type="number" tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} domain={[0, 100]} unit="%" />
        <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} width={110} />
        <Tooltip
          contentStyle={{
            background: 'var(--bg-card)', border: '1px solid var(--border-color)',
            borderRadius: 8, fontSize: 12,
          }}
          formatter={(v) => [`${v}%`, undefined]}
        />
        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
          {chartData.map((entry, i) => (
            <Cell key={i} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
