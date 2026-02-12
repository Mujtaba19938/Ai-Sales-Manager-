import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, AlertCircle, Sun } from 'lucide-react';

export default function SignupPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup, loginWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }
        setLoading(true);
        try {
            await signup(email, password, name);
            navigate('/dashboard');
        } catch (err) {
            const msg = err.code === 'auth/email-already-in-use'
                ? 'An account with this email already exists'
                : err.code === 'auth/weak-password'
                    ? 'Password is too weak. Use at least 6 characters'
                    : err.message;
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogle = async () => {
        setError('');
        try {
            await loginWithGoogle();
            navigate('/dashboard');
        } catch (err) {
            if (err.code !== 'auth/popup-closed-by-user') {
                setError('Google sign-in failed. Please try again.');
            }
        }
    };

    const inputStyle = {
        width: '100%', padding: '12px 14px 12px 42px', borderRadius: 12,
        border: '1px solid #e2e8f0', background: '#ffffff',
        color: '#0f172a', fontSize: 14, outline: 'none',
        transition: 'border-color 0.15s',
    };
    const labelStyle = { fontSize: 13, fontWeight: 600, color: '#0f172a', display: 'block', marginBottom: 6 };
    const iconStyle = { position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            background: '#ffffff',
            fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        }}>
            {/* Left — Branding Panel */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '60px 80px',
                position: 'relative',
                overflow: 'hidden',
                background: '#0f172a',
            }}>
                {/* Subtle green glow */}
                <div style={{
                    position: 'absolute', top: '-20%', left: '-10%',
                    width: 500, height: 500, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 70%)',
                    filter: 'blur(60px)', pointerEvents: 'none',
                }} />
                <div style={{
                    position: 'absolute', bottom: '-10%', right: '0%',
                    width: 400, height: 400, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)',
                    filter: 'blur(60px)', pointerEvents: 'none',
                }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                    {/* Logo */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 60 }}>
                        <Sun style={{ width: 32, height: 32, color: '#ffffff', fill: '#ffffff' }} />
                        <span style={{ fontSize: 20, fontWeight: 700, color: '#ffffff' }}>Salesflow</span>
                    </div>

                    <h1 style={{
                        fontSize: 48, fontWeight: 800, color: '#ffffff',
                        lineHeight: 1.15, marginBottom: 20, maxWidth: 480,
                    }}>
                        Start optimizing your{' '}
                        <span style={{ color: '#22c55e' }}>revenue today</span>
                    </h1>
                    <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: 440 }}>
                        Join thousands of businesses using AI-powered analytics to make smarter decisions and drive growth.
                    </p>

                    {/* Stats */}
                    <div style={{ display: 'flex', gap: 36, marginTop: 48 }}>
                        {[
                            { value: '10K+', label: 'Businesses' },
                            { value: '99.9%', label: 'Uptime' },
                            { value: '$2.4B', label: 'Tracked' },
                        ].map(s => (
                            <div key={s.label}>
                                <div style={{ fontSize: 28, fontWeight: 800, color: '#ffffff' }}>{s.value}</div>
                                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right — Signup Form */}
            <div style={{
                width: 520, display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: 40, background: '#ffffff',
            }}>
                <div style={{ width: '100%', maxWidth: 400 }}>
                    <h2 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', marginBottom: 6 }}>
                        Create your account
                    </h2>
                    <p style={{ color: '#64748b', fontSize: 14, marginBottom: 32 }}>
                        Get started with your free account
                    </p>

                    {error && (
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: 8,
                            padding: '10px 14px', borderRadius: 12,
                            background: '#fef2f2', border: '1px solid #fecaca',
                            color: '#dc2626', fontSize: 13, marginBottom: 20,
                        }}>
                            <AlertCircle size={16} style={{ flexShrink: 0 }} />
                            {error}
                        </div>
                    )}

                    {/* Google Sign-in */}
                    <button onClick={handleGoogle} type="button" style={{
                        width: '100%', padding: '12px', borderRadius: 12,
                        border: '1px solid #e2e8f0', background: '#ffffff',
                        color: '#0f172a', fontSize: 14, fontWeight: 600,
                        cursor: 'pointer', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', gap: 10, transition: 'all 0.15s',
                        marginBottom: 24,
                    }}>
                        <svg width="18" height="18" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Continue with Google
                    </button>

                    <div style={{
                        display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24,
                        color: '#94a3b8', fontSize: 13,
                    }}>
                        <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
                        <span>or</span>
                        <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div>
                            <label style={labelStyle}>Full Name</label>
                            <div style={{ position: 'relative' }}>
                                <User size={16} style={iconStyle} />
                                <input
                                    type="text" value={name} onChange={e => setName(e.target.value)}
                                    placeholder="John Doe" required style={inputStyle}
                                    onFocus={e => e.target.style.borderColor = '#22c55e'}
                                    onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                                />
                            </div>
                        </div>

                        <div>
                            <label style={labelStyle}>Email</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={16} style={iconStyle} />
                                <input
                                    type="email" value={email} onChange={e => setEmail(e.target.value)}
                                    placeholder="you@company.com" required style={inputStyle}
                                    onFocus={e => e.target.style.borderColor = '#22c55e'}
                                    onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                            <div>
                                <label style={labelStyle}>Password</label>
                                <div style={{ position: 'relative' }}>
                                    <Lock size={16} style={iconStyle} />
                                    <input
                                        type={showPassword ? 'text' : 'password'} value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        placeholder="••••••••" required minLength={6} style={inputStyle}
                                        onFocus={e => e.target.style.borderColor = '#22c55e'}
                                        onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                                    />
                                </div>
                            </div>
                            <div>
                                <label style={labelStyle}>Confirm</label>
                                <div style={{ position: 'relative' }}>
                                    <Lock size={16} style={iconStyle} />
                                    <input
                                        type={showPassword ? 'text' : 'password'} value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••" required style={inputStyle}
                                        onFocus={e => e.target.style.borderColor = '#22c55e'}
                                        onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                                    />
                                </div>
                            </div>
                        </div>

                        <label style={{
                            display: 'flex', alignItems: 'center', gap: 8,
                            fontSize: 13, color: '#64748b', cursor: 'pointer',
                        }}>
                            <input type="checkbox" checked={showPassword} onChange={e => setShowPassword(e.target.checked)}
                                style={{ accentColor: '#22c55e' }} />
                            Show passwords
                        </label>

                        <button type="submit" disabled={loading} style={{
                            width: '100%', padding: '13px', borderRadius: 100,
                            border: 'none', fontSize: 14, fontWeight: 700,
                            cursor: loading ? 'not-allowed' : 'pointer',
                            background: '#22c55e',
                            color: '#0f172a', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', gap: 8, marginTop: 4,
                            opacity: loading ? 0.7 : 1, transition: 'opacity 0.15s',
                        }}>
                            {loading ? 'Creating account...' : <>Create Account <ArrowRight size={16} /></>}
                        </button>
                    </form>

                    <p style={{ textAlign: 'center', marginTop: 28, fontSize: 14, color: '#64748b' }}>
                        Already have an account?{' '}
                        <Link to="/login" style={{ color: '#22c55e', textDecoration: 'none', fontWeight: 700 }}>
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
