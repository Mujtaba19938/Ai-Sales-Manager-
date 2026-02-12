import { GripVertical, X } from 'lucide-react';

export default function WidgetWrapper({ title, onRemove, children }) {
  return (
    <div style={{
      background: 'var(--bg-card)',
      borderRadius: 'var(--radius)',
      border: '1px solid var(--border-color)',
      boxShadow: 'var(--shadow)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      <div className="drag-handle" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 14px',
        borderBottom: '1px solid var(--border-color)',
        cursor: 'grab',
        userSelect: 'none',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <GripVertical size={14} style={{ color: 'var(--text-secondary)', opacity: 0.5 }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{title}</span>
        </div>
        {onRemove && (
          <button onClick={onRemove} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--text-secondary)', display: 'flex', padding: 2,
            opacity: 0.5,
          }}>
            <X size={14} />
          </button>
        )}
      </div>
      <div style={{ flex: 1, padding: 14, overflow: 'hidden', minHeight: 0 }}>
        {children}
      </div>
    </div>
  );
}
