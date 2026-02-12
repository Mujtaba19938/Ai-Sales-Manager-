import { WIDGET_REGISTRY } from '../../utils/constants';
import { Eye, EyeOff, X } from 'lucide-react';

export default function AddWidgetPanel({ open, onClose, activeWidgets, onToggleWidget }) {
    if (!open) return null;

    const allWidgets = Object.entries(WIDGET_REGISTRY);

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 50,
            display: 'flex', alignItems: 'start', justifyContent: 'center',
            background: 'rgba(0,0,0,0.4)', paddingTop: 100,
        }} onClick={onClose}>
            <div style={{
                background: 'var(--bg-card)', borderRadius: 'var(--radius)',
                boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
                width: '100%', maxWidth: 480, maxHeight: '70vh', overflow: 'auto',
            }} onClick={e => e.stopPropagation()}>
                <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '16px 20px', borderBottom: '1px solid var(--border-color)',
                }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600 }}>Manage Widgets</h3>
                    <button onClick={onClose} style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        color: 'var(--text-secondary)', display: 'flex',
                    }}>
                        <X size={20} />
                    </button>
                </div>
                <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {allWidgets.map(([id, widget]) => {
                        const isActive = activeWidgets.includes(id);
                        return (
                            <button
                                key={id}
                                onClick={() => onToggleWidget(id)}
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    padding: '12px 16px', borderRadius: 'var(--radius)',
                                    border: `1px solid ${isActive ? 'var(--color-primary)' : 'var(--border-color)'}`,
                                    background: isActive ? 'var(--color-primary)08' : 'var(--bg-secondary)',
                                    color: 'var(--text-primary)', cursor: 'pointer',
                                    textAlign: 'left', width: '100%', fontSize: 14,
                                    transition: 'all 0.15s',
                                }}
                            >
                                <span style={{ fontWeight: 500 }}>{widget.title}</span>
                                {isActive
                                    ? <Eye size={18} style={{ color: 'var(--color-primary)' }} />
                                    : <EyeOff size={18} style={{ color: 'var(--text-secondary)', opacity: 0.5 }} />
                                }
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
