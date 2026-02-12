import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,0.5)', padding: 20,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'var(--bg-card)', borderRadius: 'var(--radius)',
          boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
          width: '100%', maxWidth: 520, maxHeight: '90vh', overflow: 'auto',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '16px 20px', borderBottom: '1px solid var(--border-color)',
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 600 }}>{title}</h3>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--text-secondary)', display: 'flex',
            }}
          >
            <X size={20} />
          </button>
        </div>
        <div style={{ padding: 20 }}>{children}</div>
      </div>
    </div>
  );
}
