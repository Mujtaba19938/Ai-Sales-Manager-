import { useState, useEffect, useCallback } from 'react';
import { Plus, Loader } from 'lucide-react';
import DashboardGrid from '../components/dashboard/DashboardGrid';
import AddWidgetPanel from '../components/dashboard/AddWidgetPanel';
import { useAnalytics } from '../hooks/useAnalytics';
import { dashboardApi } from '../api/client';
import { DEFAULT_LAYOUT, DEFAULT_ACTIVE_WIDGETS, WIDGET_REGISTRY } from '../utils/constants';

export default function DashboardPage() {
    const { summary, trends, breakdowns, loading } = useAnalytics();
    const [layouts, setLayouts] = useState({ lg: DEFAULT_LAYOUT.lg });
    const [activeWidgets, setActiveWidgets] = useState(DEFAULT_ACTIVE_WIDGETS);
    const [addPanelOpen, setAddPanelOpen] = useState(false);
    const [configLoaded, setConfigLoaded] = useState(false);

    useEffect(() => {
        dashboardApi.getConfig().then(config => {
            if (config?.layout?.lg) setLayouts(config.layout);
            if (config?.activeWidgets?.length) setActiveWidgets(config.activeWidgets);
            setConfigLoaded(true);
        }).catch(() => setConfigLoaded(true));
    }, []);

    const handleToggleWidget = useCallback((widgetId) => {
        setActiveWidgets(prev => {
            let next;
            if (prev.includes(widgetId)) {
                next = prev.filter(id => id !== widgetId);
            } else {
                next = [...prev, widgetId];
                // Add default layout position for the new widget
                const reg = WIDGET_REGISTRY[widgetId];
                if (reg) {
                    setLayouts(prevLayouts => {
                        const lgLayout = prevLayouts.lg || [];
                        if (!lgLayout.find(l => l.i === widgetId)) {
                            return {
                                ...prevLayouts,
                                lg: [...lgLayout, { i: widgetId, x: 0, y: Infinity, w: reg.defaultSize.w, h: reg.defaultSize.h }],
                            };
                        }
                        return prevLayouts;
                    });
                }
            }
            dashboardApi.saveLayout({ layout: layouts, activeWidgets: next }).catch(() => { });
            return next;
        });
    }, [layouts]);

    const handleRemoveWidget = useCallback((widgetId) => {
        handleToggleWidget(widgetId);
    }, [handleToggleWidget]);

    if (!configLoaded) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
                <Loader size={32} style={{ animation: 'spin 1s linear infinite', color: 'var(--color-primary)' }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    return (
        <div>
            <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                marginBottom: 20,
            }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>Dashboard</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
                        {loading ? 'Loading analytics...' : 'Your business overview at a glance'}
                    </p>
                </div>
                <button
                    onClick={() => setAddPanelOpen(true)}
                    style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        padding: '10px 18px', borderRadius: 'var(--radius)',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-card)', color: 'var(--text-primary)',
                        cursor: 'pointer', fontSize: 13, fontWeight: 600,
                    }}
                >
                    <Plus size={16} /> Manage Widgets
                </button>
            </div>

            <DashboardGrid
                layouts={layouts}
                activeWidgets={activeWidgets}
                onLayoutChange={setLayouts}
                onRemoveWidget={handleRemoveWidget}
                analyticsData={{ summary, trends, breakdowns }}
            />

            <AddWidgetPanel
                open={addPanelOpen}
                onClose={() => setAddPanelOpen(false)}
                activeWidgets={activeWidgets}
                onToggleWidget={handleToggleWidget}
            />
        </div>
    );
}
