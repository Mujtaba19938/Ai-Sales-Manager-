import { Target } from 'lucide-react';
import { formatCurrency, formatNumber } from '../../utils/formatters';

export default function BreakEvenWidget({ data }) {
  if (!data) return null;

  const hasBreakEven = data.breakEvenUnits != null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%', justifyContent: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Target size={20} style={{ color: 'var(--color-primary)' }} />
        <span style={{ fontSize: 14, fontWeight: 600 }}>Break-Even Analysis</span>
      </div>

      {hasBreakEven ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ padding: 12, background: 'var(--bg-secondary)', borderRadius: 'var(--radius)' }}>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4 }}>Units Needed</div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>{formatNumber(data.breakEvenUnits)}</div>
          </div>
          <div style={{ padding: 12, background: 'var(--bg-secondary)', borderRadius: 'var(--radius)' }}>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4 }}>Revenue Needed</div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>{formatCurrency(data.breakEvenRevenue)}</div>
          </div>
          <div style={{ padding: 12, background: 'var(--bg-secondary)', borderRadius: 'var(--radius)' }}>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4 }}>Avg Unit Price</div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>{formatCurrency(data.avgUnitPrice)}</div>
          </div>
          <div style={{ padding: 12, background: 'var(--bg-secondary)', borderRadius: 'var(--radius)' }}>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4 }}>Avg Unit Cost</div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>{formatCurrency(data.avgUnitCost)}</div>
          </div>
        </div>
      ) : (
        <div style={{ color: 'var(--text-secondary)', fontSize: 13, textAlign: 'center', padding: 20 }}>
          Add sales and expense data to see break-even analysis
        </div>
      )}
    </div>
  );
}
