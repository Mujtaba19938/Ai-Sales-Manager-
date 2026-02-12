import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function SalesTrendChart({ trends = [] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={trends}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
        <XAxis dataKey="period" tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
        <YAxis tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
        <Tooltip
          contentStyle={{
            background: 'var(--bg-card)', border: '1px solid var(--border-color)',
            borderRadius: 8, fontSize: 12,
          }}
          formatter={(v) => [`$${v.toLocaleString()}`, undefined]}
        />
        <Line type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={2} dot={{ r: 3 }} name="Revenue" />
        <Line type="monotone" dataKey="profit" stroke="#0f172a" strokeWidth={2} dot={{ r: 3 }} name="Gross Profit" />
      </LineChart>
    </ResponsiveContainer>
  );
}
