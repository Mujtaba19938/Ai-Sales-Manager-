import { useState, useEffect, useCallback, useRef } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import WidgetWrapper from './WidgetWrapper';
import StatCard from '../widgets/StatCard';
import SalesTrendChart from '../widgets/SalesTrendChart';
import ProfitLossChart from '../widgets/ProfitLossChart';
import CategoryBreakdown from '../widgets/CategoryBreakdown';
import ExpenseBreakdown from '../widgets/ExpenseBreakdown';
import MarginsChart from '../widgets/MarginsChart';
import GrowthRateChart from '../widgets/GrowthRateChart';
import BreakEvenWidget from '../widgets/BreakEvenWidget';
import RecentSalesTable from '../widgets/RecentSalesTable';
import { WIDGET_REGISTRY } from '../../utils/constants';
import { dashboardApi } from '../../api/client';

const ResponsiveGridLayout = WidthProvider(Responsive);

const COMPONENTS = {
    StatCard, SalesTrendChart, ProfitLossChart, CategoryBreakdown,
    ExpenseBreakdown, MarginsChart, GrowthRateChart, BreakEvenWidget, RecentSalesTable,
};

function resolveWidgetProps(widgetId, { summary, trends, breakdowns }) {
    const reg = WIDGET_REGISTRY[widgetId];
    if (!reg) return {};
    switch (reg.component) {
        case 'StatCard': return { data: summary, ...reg.props };
        case 'SalesTrendChart': return { trends };
        case 'ProfitLossChart': return { trends };
        case 'CategoryBreakdown': return { categories: breakdowns.categories };
        case 'ExpenseBreakdown': return { expenses: breakdowns.expenses };
        case 'MarginsChart': return { data: summary };
        case 'GrowthRateChart': return { trends };
        case 'BreakEvenWidget': return { data: summary };
        case 'RecentSalesTable': return {};
        default: return {};
    }
}

export default function DashboardGrid({ layouts, activeWidgets, onLayoutChange, onRemoveWidget, analyticsData }) {
    const saveTimeout = useRef(null);

    const handleLayoutChange = useCallback((currentLayout, allLayouts) => {
        if (onLayoutChange) onLayoutChange(allLayouts);
        clearTimeout(saveTimeout.current);
        saveTimeout.current = setTimeout(() => {
            dashboardApi.saveLayout({ layout: allLayouts, activeWidgets }).catch(() => { });
        }, 1500);
    }, [activeWidgets, onLayoutChange]);

    return (
        <ResponsiveGridLayout
            className="layout"
            layouts={layouts}
            breakpoints={{ lg: 1200, md: 996, sm: 768 }}
            cols={{ lg: 12, md: 10, sm: 6 }}
            rowHeight={60}
            draggableHandle=".drag-handle"
            onLayoutChange={handleLayoutChange}
            compactType="vertical"
            margin={[16, 16]}
        >
            {activeWidgets.map(widgetId => {
                const reg = WIDGET_REGISTRY[widgetId];
                if (!reg) return null;
                const Comp = COMPONENTS[reg.component];
                if (!Comp) return null;
                const props = resolveWidgetProps(widgetId, analyticsData);
                return (
                    <div key={widgetId}>
                        <WidgetWrapper
                            title={reg.title}
                            onRemove={() => onRemoveWidget(widgetId)}
                        >
                            <Comp {...props} />
                        </WidgetWrapper>
                    </div>
                );
            })}
        </ResponsiveGridLayout>
    );
}
