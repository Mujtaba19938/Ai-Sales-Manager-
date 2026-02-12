import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const RADIUS_OPTIONS = [
    { label: 'None', value: '0' },
    { label: 'Small', value: '0.25rem' },
    { label: 'Medium', value: '0.5rem' },
    { label: 'Large', value: '0.75rem' },
    { label: 'XL', value: '1rem' },
];

export default function ThemeCustomizer() {
    const { theme, updateTheme } = useTheme();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {/* Dark / Light Mode */}
            <div>
                <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                    {theme.mode === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
                    Appearance
                </h3>
                <div style={{ display: 'flex', gap: 10 }}>
                    {['light', 'dark'].map(mode => (
                        <button
                            key={mode}
                            onClick={() => updateTheme({ mode })}
                            style={{
                                flex: 1, padding: '14px 20px', borderRadius: 'var(--radius)',
                                border: `2px solid ${theme.mode === mode ? 'var(--color-primary)' : 'var(--border-color)'}`,
                                background: mode === 'dark' ? '#1e293b' : '#f8fafc',
                                color: mode === 'dark' ? '#f1f5f9' : '#0f172a',
                                cursor: 'pointer', fontSize: 14, fontWeight: 600,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                transition: 'all 0.15s',
                            }}
                        >
                            {mode === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
                            {mode.charAt(0).toUpperCase() + mode.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Border Radius */}
            <div>
                <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Border Radius</h3>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {RADIUS_OPTIONS.map(opt => (
                        <button
                            key={opt.value}
                            onClick={() => updateTheme({ borderRadius: opt.value })}
                            style={{
                                padding: '8px 16px', borderRadius: opt.value,
                                border: `2px solid ${theme.borderRadius === opt.value ? 'var(--color-primary)' : 'var(--border-color)'}`,
                                background: theme.borderRadius === opt.value ? 'var(--color-primary)10' : 'var(--bg-secondary)',
                                color: 'var(--text-primary)', cursor: 'pointer',
                                fontSize: 13, fontWeight: 500, transition: 'all 0.15s',
                            }}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
