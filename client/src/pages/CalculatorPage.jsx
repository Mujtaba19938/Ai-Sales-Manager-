import { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Target, BarChart3 } from 'lucide-react';
import { formatCurrency, formatPercent, formatNumber } from '../utils/formatters';

export default function CalculatorPage() {
    const [inputs, setInputs] = useState({
        revenue: '',
        cogs: '',
        fixedCosts: '',
        unitPrice: '',
        unitCost: '',
        unitsToSell: '',
    });

    const update = (field, val) => setInputs(prev => ({ ...prev, [field]: val }));

    const revenue = Number(inputs.revenue) || 0;
    const cogs = Number(inputs.cogs) || 0;
    const fixedCosts = Number(inputs.fixedCosts) || 0;
    const unitPrice = Number(inputs.unitPrice) || 0;
    const unitCost = Number(inputs.unitCost) || 0;
    const unitsToSell = Number(inputs.unitsToSell) || 0;

    // From revenue inputs
    const grossProfit = revenue - cogs;
    const netProfit = grossProfit - fixedCosts;
    const grossMargin = revenue > 0 ? (grossProfit / revenue) * 100 : 0;
    const netMargin = revenue > 0 ? (netProfit / revenue) * 100 : 0;
    const operatingMargin = revenue > 0 ? ((grossProfit - fixedCosts) / revenue) * 100 : 0;

    // Break-even from unit inputs
    const contributionMargin = unitPrice - unitCost;
    const breakEvenUnits = contributionMargin > 0 ? Math.ceil(fixedCosts / contributionMargin) : null;
    const breakEvenRevenue = breakEvenUnits ? breakEvenUnits * unitPrice : null;

    // Unit projection
    const projectedRevenue = unitsToSell * unitPrice;
    const projectedCost = unitsToSell * unitCost;
    const projectedProfit = projectedRevenue - projectedCost - fixedCosts;

    const inputStyle = {
        width: '100%', padding: '10px 12px', borderRadius: 'var(--radius)',
        border: '1px solid var(--border-color)', background: 'var(--bg-secondary)',
        color: 'var(--text-primary)', fontSize: 14, outline: 'none',
    };
    const labelStyle = { fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 4, display: 'block' };
    const resultCard = {
        padding: 16, borderRadius: 'var(--radius)', background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
    };
    const resultLabel = { fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4 };
    const resultValue = { fontSize: 22, fontWeight: 700 };

    return (
        <div>
            <div style={{ marginBottom: 24 }}>
                <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Calculator size={24} style={{ color: 'var(--color-primary)' }} />
                    What-If Calculator
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
                    Run hypothetical scenarios to analyze profitability and break-even points
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                {/* Inputs */}
                <div style={{
                    background: 'var(--bg-card)', borderRadius: 'var(--radius)',
                    border: '1px solid var(--border-color)', padding: 24,
                }}>
                    <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <DollarSign size={18} style={{ color: 'var(--color-primary)' }} /> Revenue Inputs
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        <div>
                            <label style={labelStyle}>Total Revenue ($)</label>
                            <input type="number" min="0" step="0.01" value={inputs.revenue} onChange={e => update('revenue', e.target.value)} placeholder="e.g. 50000" style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Cost of Goods Sold ($)</label>
                            <input type="number" min="0" step="0.01" value={inputs.cogs} onChange={e => update('cogs', e.target.value)} placeholder="e.g. 20000" style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Fixed / Operating Costs ($)</label>
                            <input type="number" min="0" step="0.01" value={inputs.fixedCosts} onChange={e => update('fixedCosts', e.target.value)} placeholder="e.g. 10000" style={inputStyle} />
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid var(--border-color)', marginTop: 24, paddingTop: 24 }}>
                        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Target size={18} style={{ color: 'var(--color-accent)' }} /> Break-Even Inputs
                        </h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                            <div>
                                <label style={labelStyle}>Unit Price ($)</label>
                                <input type="number" min="0" step="0.01" value={inputs.unitPrice} onChange={e => update('unitPrice', e.target.value)} placeholder="e.g. 25" style={inputStyle} />
                            </div>
                            <div>
                                <label style={labelStyle}>Unit Cost ($)</label>
                                <input type="number" min="0" step="0.01" value={inputs.unitCost} onChange={e => update('unitCost', e.target.value)} placeholder="e.g. 10" style={inputStyle} />
                            </div>
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid var(--border-color)', marginTop: 24, paddingTop: 24 }}>
                        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <BarChart3 size={18} style={{ color: '#10b981' }} /> Unit Projection
                        </h2>
                        <div>
                            <label style={labelStyle}>Units To Sell</label>
                            <input type="number" min="0" value={inputs.unitsToSell} onChange={e => update('unitsToSell', e.target.value)} placeholder="e.g. 500" style={inputStyle} />
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={{
                        background: 'var(--bg-card)', borderRadius: 'var(--radius)',
                        border: '1px solid var(--border-color)', padding: 24,
                    }}>
                        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <TrendingUp size={18} style={{ color: '#10b981' }} /> Profitability Analysis
                        </h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                            <div style={resultCard}>
                                <div style={resultLabel}>Gross Profit</div>
                                <div style={{ ...resultValue, color: grossProfit >= 0 ? '#10b981' : '#f43f5e' }}>{formatCurrency(grossProfit)}</div>
                            </div>
                            <div style={resultCard}>
                                <div style={resultLabel}>Net Profit</div>
                                <div style={{ ...resultValue, color: netProfit >= 0 ? '#10b981' : '#f43f5e' }}>{formatCurrency(netProfit)}</div>
                            </div>
                            <div style={resultCard}>
                                <div style={resultLabel}>Gross Margin</div>
                                <div style={resultValue}>{formatPercent(grossMargin)}</div>
                            </div>
                            <div style={resultCard}>
                                <div style={resultLabel}>Net Margin</div>
                                <div style={{ ...resultValue, color: netMargin >= 0 ? 'var(--text-primary)' : '#f43f5e' }}>{formatPercent(netMargin)}</div>
                            </div>
                            <div style={{ ...resultCard, gridColumn: '1 / -1' }}>
                                <div style={resultLabel}>Operating Margin</div>
                                <div style={resultValue}>{formatPercent(operatingMargin)}</div>
                            </div>
                        </div>
                    </div>

                    <div style={{
                        background: 'var(--bg-card)', borderRadius: 'var(--radius)',
                        border: '1px solid var(--border-color)', padding: 24,
                    }}>
                        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Target size={18} style={{ color: 'var(--color-accent)' }} /> Break-Even Point
                        </h2>
                        {breakEvenUnits != null ? (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                <div style={resultCard}>
                                    <div style={resultLabel}>Units to Break Even</div>
                                    <div style={resultValue}>{formatNumber(breakEvenUnits)}</div>
                                </div>
                                <div style={resultCard}>
                                    <div style={resultLabel}>Revenue to Break Even</div>
                                    <div style={resultValue}>{formatCurrency(breakEvenRevenue)}</div>
                                </div>
                                <div style={{ ...resultCard, gridColumn: '1 / -1' }}>
                                    <div style={resultLabel}>Contribution Margin per Unit</div>
                                    <div style={resultValue}>{formatCurrency(contributionMargin)}</div>
                                </div>
                            </div>
                        ) : (
                            <p style={{ color: 'var(--text-secondary)', fontSize: 13, textAlign: 'center', padding: 20 }}>
                                Enter unit price and unit cost (price &gt; cost) with fixed costs to see break-even analysis
                            </p>
                        )}
                    </div>

                    {unitsToSell > 0 && (
                        <div style={{
                            background: 'var(--bg-card)', borderRadius: 'var(--radius)',
                            border: '1px solid var(--border-color)', padding: 24,
                        }}>
                            <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                                <BarChart3 size={18} style={{ color: '#10b981' }} /> Projection ({formatNumber(unitsToSell)} units)
                            </h2>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                                <div style={resultCard}>
                                    <div style={resultLabel}>Projected Revenue</div>
                                    <div style={{ ...resultValue, fontSize: 18 }}>{formatCurrency(projectedRevenue)}</div>
                                </div>
                                <div style={resultCard}>
                                    <div style={resultLabel}>Total Cost</div>
                                    <div style={{ ...resultValue, fontSize: 18 }}>{formatCurrency(projectedCost + fixedCosts)}</div>
                                </div>
                                <div style={resultCard}>
                                    <div style={resultLabel}>Projected Profit</div>
                                    <div style={{ ...resultValue, fontSize: 18, color: projectedProfit >= 0 ? '#10b981' : '#f43f5e' }}>{formatCurrency(projectedProfit)}</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
