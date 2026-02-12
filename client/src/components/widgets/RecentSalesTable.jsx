import { useEffect, useState } from 'react';
import { salesApi } from '../../api/client';
import { formatCurrency, formatDate } from '../../utils/formatters';

export default function RecentSalesTable() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    salesApi.list({ limit: 8 }).then(res => setSales(res.data)).catch(() => {});
  }, []);

  if (!sales.length) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-secondary)', fontSize: 13 }}>No sales yet</div>;
  }

  return (
    <div style={{ overflow: 'auto', height: '100%' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
            <th style={{ textAlign: 'left', padding: '8px 6px', color: 'var(--text-secondary)', fontWeight: 600 }}>Date</th>
            <th style={{ textAlign: 'left', padding: '8px 6px', color: 'var(--text-secondary)', fontWeight: 600 }}>Product</th>
            <th style={{ textAlign: 'right', padding: '8px 6px', color: 'var(--text-secondary)', fontWeight: 600 }}>Qty</th>
            <th style={{ textAlign: 'right', padding: '8px 6px', color: 'var(--text-secondary)', fontWeight: 600 }}>Revenue</th>
            <th style={{ textAlign: 'right', padding: '8px 6px', color: 'var(--text-secondary)', fontWeight: 600 }}>Profit</th>
          </tr>
        </thead>
        <tbody>
          {sales.map(s => {
            const rev = (s.quantity * s.unitPrice) - s.discount;
            const cost = s.quantity * s.unitCost;
            const profit = rev - cost;
            return (
              <tr key={s._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '8px 6px' }}>{formatDate(s.date)}</td>
                <td style={{ padding: '8px 6px' }}>{s.product?.name || '-'}</td>
                <td style={{ padding: '8px 6px', textAlign: 'right' }}>{s.quantity}</td>
                <td style={{ padding: '8px 6px', textAlign: 'right' }}>{formatCurrency(rev)}</td>
                <td style={{
                  padding: '8px 6px', textAlign: 'right',
                  color: profit >= 0 ? '#10b981' : '#f43f5e',
                }}>
                  {formatCurrency(profit)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
