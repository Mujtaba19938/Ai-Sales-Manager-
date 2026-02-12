import { DollarSign, TrendingUp, CreditCard, Percent } from 'lucide-react';
import { formatCurrency, formatPercent, formatNumber } from '../../utils/formatters';

const ICONS = { DollarSign, TrendingUp, CreditCard, Percent };

export default function StatCard({ data, metric, format, icon, color }) {
  const Icon = ICONS[icon] || DollarSign;
  const value = data?.[metric] ?? 0;

  let formatted;
  if (format === 'currency') formatted = formatCurrency(value);
  else if (format === 'percent') formatted = formatPercent(value);
  else formatted = formatNumber(value);

  const isNegative = value < 0;

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14, height: '100%',
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: 12,
        background: `${color}15`, display: 'flex',
        alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <Icon size={24} style={{ color }} />
      </div>
      <div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>
          {metric === 'totalRevenue' ? 'Total Revenue' :
           metric === 'netProfit' ? 'Net Profit' :
           metric === 'totalExpenses' ? 'Total Expenses' :
           metric === 'grossMargin' ? 'Gross Margin' : metric}
        </div>
        <div style={{
          fontSize: 22, fontWeight: 700,
          color: isNegative ? '#f43f5e' : 'var(--text-primary)',
        }}>
          {formatted}
        </div>
      </div>
    </div>
  );
}
