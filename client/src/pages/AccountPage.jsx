import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Mail, User, Shield, Calendar } from 'lucide-react';

export default function AccountPage() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const created = user?.metadata?.creationTime
        ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric',
        })
        : '—';

    const lastLogin = user?.metadata?.lastSignInTime
        ? new Date(user.metadata.lastSignInTime).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
        })
        : '—';

    const initial = user?.displayName
        ? user.displayName.charAt(0).toUpperCase()
        : user?.email
            ? user.email.charAt(0).toUpperCase()
            : '?';

    const cardStyle = {
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 16,
        padding: 28,
        boxShadow: 'var(--shadow)',
    };

    const infoRowStyle = {
        display: 'flex', alignItems: 'center', gap: 14,
        padding: '14px 0',
        borderBottom: '1px solid var(--border-color)',
    };

    return (
        <div style={{ padding: 32, maxWidth: 640, margin: '0 auto' }}>
            {/* Profile Header */}
            <div style={{ ...cardStyle, display: 'flex', alignItems: 'center', gap: 24, marginBottom: 24 }}>
                <div style={{
                    width: 72, height: 72, borderRadius: '50%',
                    background: 'var(--color-primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 28, fontWeight: 800, color: '#fff',
                    flexShrink: 0,
                }}>
                    {initial}
                </div>
                <div>
                    <h1 style={{
                        fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4,
                    }}>
                        {user?.displayName || 'User'}
                    </h1>
                    <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
                        {user?.email}
                    </p>
                </div>
            </div>

            {/* Account Info */}
            <div style={{ ...cardStyle, marginBottom: 24 }}>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
                    Account Information
                </h2>

                <div style={infoRowStyle}>
                    <User size={18} style={{ color: 'var(--text-secondary)', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 2 }}>Display Name</div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>
                            {user?.displayName || 'Not set'}
                        </div>
                    </div>
                </div>

                <div style={infoRowStyle}>
                    <Mail size={18} style={{ color: 'var(--text-secondary)', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 2 }}>Email Address</div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>
                            {user?.email}
                        </div>
                    </div>
                </div>

                <div style={infoRowStyle}>
                    <Shield size={18} style={{ color: 'var(--text-secondary)', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 2 }}>Sign-in Provider</div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>
                            {user?.providerData?.[0]?.providerId === 'google.com' ? 'Google' : 'Email & Password'}
                        </div>
                    </div>
                </div>

                <div style={infoRowStyle}>
                    <Calendar size={18} style={{ color: 'var(--text-secondary)', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 2 }}>Account Created</div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{created}</div>
                    </div>
                </div>

                <div style={{ ...infoRowStyle, borderBottom: 'none' }}>
                    <Calendar size={18} style={{ color: 'var(--text-secondary)', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 2 }}>Last Sign-in</div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{lastLogin}</div>
                    </div>
                </div>
            </div>

            {/* Logout */}
            <button onClick={handleLogout} style={{
                width: '100%', padding: '14px', borderRadius: 12,
                border: '1px solid #fecaca', background: 'rgba(239,68,68,0.08)',
                color: '#ef4444', cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center', gap: 10,
                fontSize: 15, fontWeight: 700, transition: 'background 0.15s',
            }}>
                <LogOut size={18} />
                Sign Out
            </button>
        </div>
    );
}
