import { useState, useEffect, useCallback } from 'react';
import { Plus, Pencil, Trash2, Loader, Package } from 'lucide-react';
import Modal from '../components/shared/Modal';
import { productsApi, categoriesApi } from '../api/client';
import { formatCurrency } from '../utils/formatters';

const emptyForm = { name: '', sku: '', category: '', defaultPrice: '', defaultCost: '' };

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [showInactive, setShowInactive] = useState(false);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const [p, c] = await Promise.all([
                productsApi.list(showInactive ? {} : { active: 'true' }),
                categoriesApi.list(),
            ]);
            setProducts(p);
            setCategories(c);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [showInactive]);

    useEffect(() => { fetchData(); }, [fetchData]);

    const openAdd = () => {
        setEditing(null);
        setForm(emptyForm);
        setModalOpen(true);
    };

    const openEdit = (prod) => {
        setEditing(prod._id);
        setForm({
            name: prod.name,
            sku: prod.sku || '',
            category: prod.category?._id || prod.category || '',
            defaultPrice: String(prod.defaultPrice),
            defaultCost: String(prod.defaultCost),
        });
        setModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name: form.name,
            sku: form.sku || undefined,
            category: form.category,
            defaultPrice: Number(form.defaultPrice),
            defaultCost: Number(form.defaultCost),
        };
        try {
            if (editing) {
                await productsApi.update(editing, data);
            } else {
                await productsApi.create(data);
            }
            setModalOpen(false);
            fetchData();
        } catch (err) {
            alert(err.message);
        }
    };

    const handleDeactivate = async (id) => {
        if (!confirm('Deactivate this product?')) return;
        await productsApi.delete(id);
        fetchData();
    };

    const margin = (p) => {
        if (!p.defaultPrice) return 0;
        return (((p.defaultPrice - p.defaultCost) / p.defaultPrice) * 100).toFixed(1);
    };

    const inputStyle = {
        width: '100%', padding: '10px 12px', borderRadius: 'var(--radius)',
        border: '1px solid var(--border-color)', background: 'var(--bg-secondary)',
        color: 'var(--text-primary)', fontSize: 14, outline: 'none',
    };

    const labelStyle = { fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 4, display: 'block' };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>Products</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{products.length} products</p>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <label style={{
                        display: 'flex', alignItems: 'center', gap: 6, fontSize: 13,
                        color: 'var(--text-secondary)', cursor: 'pointer',
                    }}>
                        <input type="checkbox" checked={showInactive} onChange={e => setShowInactive(e.target.checked)}
                            style={{ accentColor: 'var(--color-primary)' }} />
                        Show inactive
                    </label>
                    <button onClick={openAdd} style={{
                        display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px',
                        borderRadius: 'var(--radius)', border: 'none', background: 'var(--color-primary)',
                        color: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                    }}>
                        <Plus size={16} /> Add Product
                    </button>
                </div>
            </div>

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
                    <Loader size={28} style={{ animation: 'spin 1s linear infinite', color: 'var(--color-primary)' }} />
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
                    {products.length === 0 ? (
                        <div style={{
                            gridColumn: '1 / -1', textAlign: 'center', padding: 60,
                            color: 'var(--text-secondary)', background: 'var(--bg-card)',
                            borderRadius: 'var(--radius)', border: '1px solid var(--border-color)',
                        }}>
                            <Package size={40} style={{ opacity: 0.3, marginBottom: 12 }} />
                            <p>No products yet. Click "Add Product" to create your catalog.</p>
                        </div>
                    ) : products.map(prod => (
                        <div key={prod._id} style={{
                            background: 'var(--bg-card)', borderRadius: 'var(--radius)',
                            border: '1px solid var(--border-color)', padding: 20,
                            opacity: prod.isActive === false ? 0.5 : 1,
                            transition: 'box-shadow 0.15s',
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 12 }}>
                                <div>
                                    <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{prod.name}</h3>
                                    {prod.sku && <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>SKU: {prod.sku}</p>}
                                </div>
                                <div style={{ display: 'flex', gap: 4 }}>
                                    <button onClick={() => openEdit(prod)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: 4 }}>
                                        <Pencil size={14} />
                                    </button>
                                    <button onClick={() => handleDeactivate(prod._id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f43f5e', padding: 4 }}>
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                            {prod.category && (
                                <span style={{
                                    padding: '2px 8px', borderRadius: 12, fontSize: 11,
                                    background: `${prod.category?.color || '#22c55e'}20`,
                                    color: prod.category?.color || '#22c55e',
                                }}>{prod.category?.name || 'Uncategorized'}</span>
                            )}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 16 }}>
                                <div>
                                    <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Price</div>
                                    <div style={{ fontSize: 15, fontWeight: 600 }}>{formatCurrency(prod.defaultPrice)}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Cost</div>
                                    <div style={{ fontSize: 15, fontWeight: 600 }}>{formatCurrency(prod.defaultCost)}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Margin</div>
                                    <div style={{ fontSize: 15, fontWeight: 600, color: '#10b981' }}>{margin(prod)}%</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Product' : 'New Product'}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div>
                        <label style={labelStyle}>Product Name</label>
                        <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required style={inputStyle} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                        <div>
                            <label style={labelStyle}>SKU (optional)</label>
                            <input type="text" value={form.sku} onChange={e => setForm({ ...form, sku: e.target.value })} style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Category</label>
                            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required style={inputStyle}>
                                <option value="">Select category...</option>
                                {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                            </select>
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                        <div>
                            <label style={labelStyle}>Default Price ($)</label>
                            <input type="number" min="0" step="0.01" value={form.defaultPrice} onChange={e => setForm({ ...form, defaultPrice: e.target.value })} required style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Default Cost ($)</label>
                            <input type="number" min="0" step="0.01" value={form.defaultCost} onChange={e => setForm({ ...form, defaultCost: e.target.value })} required style={inputStyle} />
                        </div>
                    </div>
                    <button type="submit" style={{
                        padding: '12px', borderRadius: 'var(--radius)', border: 'none',
                        background: 'var(--color-primary)', color: '#fff', fontSize: 14,
                        fontWeight: 600, cursor: 'pointer', marginTop: 4,
                    }}>
                        {editing ? 'Update Product' : 'Create Product'}
                    </button>
                </form>
            </Modal>
        </div>
    );
}
