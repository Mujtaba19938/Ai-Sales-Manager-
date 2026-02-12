import { Sun, Moon, MessageCircle, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useDateRange } from '../../context/DateRangeContext';
import { useAuth } from '../../context/AuthContext';
import { getExportUrl } from '../../api/client';

export default function TopBar({ onToggleChat }) {
  const { theme, updateTheme } = useTheme();
  const { dateRange, setDateRange } = useDateRange();
  const { user } = useAuth();
  const navigate = useNavigate();

  const initial = user?.displayName
    ? user.displayName.charAt(0).toUpperCase()
    : user?.email
      ? user.email.charAt(0).toUpperCase()
      : '?';

  return (
    <header style={{
      height: 64,
      background: 'var(--bg-card)',
      borderBottom: '1px solid var(--border-color)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      position: 'sticky',
      top: 0,
      zIndex: 20,
      boxShadow: 'var(--shadow)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <label style={{ fontSize: 13, color: 'var(--text-secondary)' }}>From</label>
        <input
          type="date"
          value={dateRange.startDate}
          onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
          style={{
            padding: '6px 10px',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            fontSize: 13,
          }}
        />
        <label style={{ fontSize: 13, color: 'var(--text-secondary)' }}>To</label>
        <input
          type="date"
          value={dateRange.endDate}
          onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
          style={{
            padding: '6px 10px',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            fontSize: 13,
          }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <a
          href={getExportUrl('sales', dateRange.startDate, dateRange.endDate)}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 14px', borderRadius: 'var(--radius)',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-secondary)', color: 'var(--text-primary)',
            textDecoration: 'none', fontSize: 13, cursor: 'pointer',
          }}
        >
          <Download size={16} /> Export
        </a>

        <button
          onClick={() => updateTheme({ mode: theme.mode === 'dark' ? 'light' : 'dark' })}
          style={{
            padding: 8, borderRadius: 'var(--radius)',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-secondary)', color: 'var(--text-primary)',
            cursor: 'pointer', display: 'flex',
          }}
        >
          {theme.mode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button
          onClick={onToggleChat}
          style={{
            padding: '8px 14px', borderRadius: 'var(--radius)',
            border: 'none', background: 'var(--color-primary)',
            color: '#fff', cursor: 'pointer', display: 'flex',
            alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600,
          }}
        >
          <MessageCircle size={18} /> AI Chat
        </button>

        <button
          onClick={() => navigate('/dashboard/account')}
          title={user?.displayName || user?.email || 'Account'}
          style={{
            width: 36, height: 36, borderRadius: '50%',
            border: '2px solid var(--color-primary)',
            background: 'var(--color-primary)',
            color: '#fff', cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 700,
            transition: 'opacity 0.15s',
          }}
        >
          {initial}
        </button>
      </div>
    </header>
  );
}
