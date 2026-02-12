import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function ProfitLossChart({ trends = [] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={trends}>
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
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Bar dataKey="revenue" fill="#22c55e" name="Revenue" radius={[4, 4, 0, 0]} />
        <Bar dataKey="expenses" fill="#0f172a" name="Expenses" radius={[4, 4, 0, 0]} />
        <Bar dataKey="netProfit" fill="#16a34a" name="Net Profit" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
