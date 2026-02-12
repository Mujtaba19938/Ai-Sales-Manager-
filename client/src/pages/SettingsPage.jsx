import { useState, useEffect } from 'react';
import { Settings, Tag, Plus, Trash2, Download } from 'lucide-react';
import ThemeCustomizer from '../components/settings/ThemeCustomizer';
import Modal from '../components/shared/Modal';
import { categoriesApi } from '../api/client';
import { getExportUrl } from '../api/client';
import { useDateRange } from '../context/DateRangeContext';

export default function SettingsPage() {
    const [categories, setCategories] = useState([]);
    const [catModalOpen, setCatModalOpen] = useState(false);
    const [catForm, setCatForm] = useState({ name: '', color: '#22c55e', type: 'product' });
    const { dateRange } = useDateRange();

    useEffect(() => {
        categoriesApi.list().then(setCategories).catch(() => { });
    }, []);

    const handleAddCategory = async (e) => {
        e.preventDefault();
        try {
            await categoriesApi.create(catForm);
            setCatModalOpen(false);
            setCatForm({ name: '', color: '#22c55e', type: 'product' });
            const cats = await categoriesApi.list();
            setCategories(cats);
        } catch (err) {
            alert(err.message);
        }
    };

    const handleDeleteCategory = async (id) => {
        if (!confirm('Delete this category?')) return;
        await categoriesApi.delete(id);
        const cats = await categoriesApi.list();
        setCategories(cats);
    };

    const sectionStyle = {
        background: 'var(--bg-card)', borderRadius: 'var(--radius)',
        border: '1px solid var(--border-color)', padding: 24,
    };

    const inputStyle = {
        width: '100%', padding: '10px 12px', borderRadius: 'var(--radius)',
        border: '1px solid var(--border-color)', background: 'var(--bg-secondary)',
        color: 'var(--text-primary)', fontSize: 14, outline: 'none',
    };

    const labelStyle = { fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 4, display: 'block' };

    return (
        <div>
            <div style={{ marginBottom: 24 }}>
                <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Settings size={24} style={{ color: 'var(--color-primary)' }} />
                    Settings
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Customize your dashboard appearance and manage data</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {/* Theme */}
                <div style={sectionStyle}>
                    <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>Theme & Appearance</h2>
                    <ThemeCustomizer />
                </div>

                {/* Categories */}
                <div style={sectionStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <h2 style={{ fontSize: 18, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Tag size={18} /> Categories
                        </h2>
                        <button onClick={() => setCatModalOpen(true)} style={{
                            display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px',
                            borderRadius: 'var(--radius)', border: 'none', background: 'var(--color-primary)',
                            color: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                        }}>
                            <Plus size={14} /> Add
                        </button>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {categories.map(cat => (
                            <div key={cat._id} style={{
                                display: 'flex', alignItems: 'center', gap: 8,
                                padding: '8px 14px', borderRadius: 'var(--radius)',
                                border: '1px solid var(--border-color)', background: 'var(--bg-secondary)',
                            }}>
                                <div style={{ width: 12, height: 12, borderRadius: '50%', background: cat.color }} />
                                <span style={{ fontSize: 13, fontWeight: 500 }}>{cat.name}</span>
                                <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>({cat.type})</span>
                                <button onClick={() => handleDeleteCategory(cat._id)} style={{
                                    background: 'none', border: 'none', cursor: 'pointer', color: '#f43f5e',
                                    display: 'flex', padding: 2, marginLeft: 4,
                                }}>
                                    <Trash2 size={13} />
                                </button>
                            </div>
                        ))}
                        {categories.length === 0 && (
                            <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>No categories yet.</p>
                        )}
                    </div>
                </div>

                {/* Export */}
                <div style={sectionStyle}>
                    <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Download size={18} /> Data Export
                    </h2>
                    <div style={{ display: 'flex', gap: 12 }}>
                        <a href={getExportUrl('sales', dateRange.startDate, dateRange.endDate)} style={{
                            display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px',
                            borderRadius: 'var(--radius)', border: '1px solid var(--border-color)',
                            background: 'var(--bg-secondary)', color: 'var(--text-primary)',
                            textDecoration: 'none', fontSize: 13, fontWeight: 600,
                        }}>
                            <Download size={16} /> Export Sales (CSV)
                        </a>
                        <a href={getExportUrl('expenses', dateRange.startDate, dateRange.endDate)} style={{
                            display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px',
                            borderRadius: 'var(--radius)', border: '1px solid var(--border-color)',
                            background: 'var(--bg-secondary)', color: 'var(--text-primary)',
                            textDecoration: 'none', fontSize: 13, fontWeight: 600,
                        }}>
                            <Download size={16} /> Export Expenses (CSV)
                        </a>
                    </div>
                </div>
            </div>

            <Modal open={catModalOpen} onClose={() => setCatModalOpen(false)} title="New Category">
                <form onSubmit={handleAddCategory} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div>
                        <label style={labelStyle}>Name</label>
                        <input type="text" value={catForm.name} onChange={e => setCatForm({ ...catForm, name: e.target.value })} required style={inputStyle} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                        <div>
                            <label style={labelStyle}>Color</label>
                            <input type="color" value={catForm.color} onChange={e => setCatForm({ ...catForm, color: e.target.value })} style={{ width: '100%', height: 40, border: 'none', cursor: 'pointer', borderRadius: 'var(--radius)' }} />
                        </div>
                        <div>
                            <label style={labelStyle}>Type</label>
                            <select value={catForm.type} onChange={e => setCatForm({ ...catForm, type: e.target.value })} style={inputStyle}>
                                <option value="product">Product</option>
                                <option value="expense">Expense</option>
                                <option value="both">Both</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" style={{
                        padding: '12px', borderRadius: 'var(--radius)', border: 'none',
                        background: 'var(--color-primary)', color: '#fff', fontSize: 14,
                        fontWeight: 600, cursor: 'pointer', marginTop: 4,
                    }}>
                        Create Category
                    </button>
                </form>
            </Modal>
        </div>
    );
}
