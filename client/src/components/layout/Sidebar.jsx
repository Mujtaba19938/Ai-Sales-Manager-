import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Receipt, Package, Calculator, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const links = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/dashboard/sales', icon: ShoppingCart, label: 'Sales' },
  { to: '/dashboard/expenses', icon: Receipt, label: 'Expenses' },
  { to: '/dashboard/products', icon: Package, label: 'Products' },
  { to: '/dashboard/calculator', icon: Calculator, label: 'Calculator' },
  { to: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      style={{
        width: collapsed ? 64 : 240,
        background: 'var(--bg-sidebar)',
        transition: 'width 0.2s ease',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'sticky',
        top: 0,
        zIndex: 30,
        flexShrink: 0,
      }}
    >
      <div style={{
        padding: collapsed ? '20px 12px' : '20px 20px',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 64,
      }}>
        {!collapsed && (
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 18 }}>
            Sales<span style={{ color: 'var(--color-primary)' }}>Flow AI</span>
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            borderRadius: 6,
            padding: 6,
            cursor: 'pointer',
            color: '#94a3b8',
            display: 'flex',
          }}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav style={{ padding: '12px 8px', flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/dashboard'}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: collapsed ? '10px 12px' : '10px 16px',
              borderRadius: 8,
              textDecoration: 'none',
              color: isActive ? '#fff' : '#94a3b8',
              background: isActive ? 'var(--color-primary)' : 'transparent',
              fontSize: 14,
              fontWeight: isActive ? 600 : 400,
              transition: 'all 0.15s',
              justifyContent: collapsed ? 'center' : 'flex-start',
            })}
          >
            <Icon size={20} />
            {!collapsed && label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
