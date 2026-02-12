import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export default function GrowthRateChart({ trends = [] }) {
  const data = trends.map((t, i) => {
    if (i === 0) return { ...t, growth: 0 };
    const prev = trends[i - 1].revenue;
    return { ...t, growth: prev > 0 ? +(((t.revenue - prev) / prev) * 100).toFixed(1) : 0 };
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
        <XAxis dataKey="period" tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
        <YAxis tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} unit="%" />
        <Tooltip
          contentStyle={{
            background: 'var(--bg-card)', border: '1px solid var(--border-color)',
            borderRadius: 8, fontSize: 12,
          }}
          formatter={(v) => [`${v}%`, 'Growth']}
        />
        <ReferenceLine y={0} stroke="var(--text-secondary)" strokeDasharray="3 3" />
        <Area type="monotone" dataKey="growth" stroke="#22c55e" fill="#22c55e15" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
