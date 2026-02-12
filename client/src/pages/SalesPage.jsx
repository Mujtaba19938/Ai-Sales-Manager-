import { useState, useEffect, useCallback } from 'react';
import { Plus, Pencil, Trash2, Loader } from 'lucide-react';
import Modal from '../components/shared/Modal';
import { salesApi, productsApi, categoriesApi } from '../api/client';
import { formatCurrency, formatDate, formatDateInput } from '../utils/formatters';

const emptyForm = { date: '', product: '', category: '', quantity: '', unitPrice: '', unitCost: '', discount: '0', notes: '' };

export default function SalesPage() {
    const [sales, setSales] = useState([]);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(emptyForm);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const [s, p, c] = await Promise.all([
                salesApi.list({ limit: 200 }),
                productsApi.list({ active: 'true' }),
                categoriesApi.list(),
            ]);
            setSales(s.data);
            setProducts(p);
            setCategories(c);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchData(); }, [fetchData]);

    const openAdd = () => {
        setEditing(null);
        setForm({ ...emptyForm, date: new Date().toISOString().split('T')[0] });
        setModalOpen(true);
    };

    const openEdit = (sale) => {
        setEditing(sale._id);
        setForm({
            date: formatDateInput(sale.date),
            product: sale.product?._id || sale.product || '',
            category: sale.category?._id || sale.category || '',
            quantity: String(sale.quantity),
            unitPrice: String(sale.unitPrice),
            unitCost: String(sale.unitCost),
            discount: String(sale.discount || 0),
            notes: sale.notes || '',
        });
        setModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            date: form.date,
            product: form.product,
            category: form.category,
            quantity: Number(form.quantity),
            unitPrice: Number(form.unitPrice),
            unitCost: Number(form.unitCost),
            discount: Number(form.discount) || 0,
            notes: form.notes,
        };
        try {
            if (editing) {
                await salesApi.update(editing, data);
            } else {
                await salesApi.create(data);
            }
            setModalOpen(false);
            fetchData();
        } catch (err) {
            alert(err.message);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this sale entry?')) return;
        await salesApi.delete(id);
        fetchData();
    };

    const handleProductSelect = (productId) => {
        const prod = products.find(p => p._id === productId);
        setForm(prev => ({
            ...prev,
            product: productId,
            category: prod?.category?._id || prod?.category || prev.category,
            unitPrice: prod ? String(prod.defaultPrice) : prev.unitPrice,
            unitCost: prod ? String(prod.defaultCost) : prev.unitCost,
        }));
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
                    <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>Sales</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{sales.length} entries</p>
                </div>
                <button onClick={openAdd} style={{
                    display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px',
                    borderRadius: 'var(--radius)', border: 'none', background: 'var(--color-primary)',
                    color: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                }}>
                    <Plus size={16} /> Add Sale
                </button>
            </div>

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
                    <Loader size={28} style={{ animation: 'spin 1s linear infinite', color: 'var(--color-primary)' }} />
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </div>
            ) : (
                <div style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius)', border: '1px solid var(--border-color)', overflow: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 800 }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                                {['Date', 'Product', 'Category', 'Qty', 'Unit Price', 'Unit Cost', 'Discount', 'Revenue', 'Profit', ''].map(h => (
                                    <th key={h} style={{ textAlign: h === '' ? 'center' : 'left', padding: '12px 10px', color: 'var(--text-secondary)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {sales.length === 0 ? (
                                <tr><td colSpan={10} style={{ textAlign: 'center', padding: 40, color: 'var(--text-secondary)' }}>No sales entries yet. Click "Add Sale" to get started.</td></tr>
                            ) : sales.map(s => {
                                const rev = (s.quantity * s.unitPrice) - (s.discount || 0);
                                const cost = s.quantity * s.unitCost;
                                const profit = rev - cost;
                                return (
                                    <tr key={s._id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.1s' }}>
                                        <td style={{ padding: '10px' }}>{formatDate(s.date)}</td>
                                        <td style={{ padding: '10px' }}>{s.product?.name || '-'}</td>
                                        <td style={{ padding: '10px' }}>
                                            <span style={{
                                                padding: '2px 8px', borderRadius: 12, fontSize: 12,
                                                background: `${s.category?.color || '#22c55e'}20`,
                                                color: s.category?.color || '#22c55e',
                                            }}>{s.category?.name || '-'}</span>
                                        </td>
                                        <td style={{ padding: '10px' }}>{s.quantity}</td>
                                        <td style={{ padding: '10px' }}>{formatCurrency(s.unitPrice)}</td>
                                        <td style={{ padding: '10px' }}>{formatCurrency(s.unitCost)}</td>
                                        <td style={{ padding: '10px' }}>{formatCurrency(s.discount)}</td>
                                        <td style={{ padding: '10px', fontWeight: 600 }}>{formatCurrency(rev)}</td>
                                        <td style={{ padding: '10px', fontWeight: 600, color: profit >= 0 ? '#10b981' : '#f43f5e' }}>{formatCurrency(profit)}</td>
                                        <td style={{ padding: '10px', textAlign: 'center' }}>
                                            <div style={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
                                                <button onClick={() => openEdit(s)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: 4 }}>
                                                    <Pencil size={15} />
                                                </button>
                                                <button onClick={() => handleDelete(s._id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f43f5e', padding: 4 }}>
                                                    <Trash2 size={15} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Sale' : 'New Sale'}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                        <div>
                            <label style={labelStyle}>Date</label>
                            <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Product</label>
                            <select value={form.product} onChange={e => handleProductSelect(e.target.value)} required style={inputStyle}>
                                <option value="">Select product...</option>
                                {products.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label style={labelStyle}>Category</label>
                        <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required style={inputStyle}>
                            <option value="">Select category...</option>
                            {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                        </select>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 14 }}>
                        <div>
                            <label style={labelStyle}>Quantity</label>
                            <input type="number" min="1" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} required style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Unit Price</label>
                            <input type="number" min="0" step="0.01" value={form.unitPrice} onChange={e => setForm({ ...form, unitPrice: e.target.value })} required style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Unit Cost</label>
                            <input type="number" min="0" step="0.01" value={form.unitCost} onChange={e => setForm({ ...form, unitCost: e.target.value })} required style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Discount</label>
                            <input type="number" min="0" step="0.01" value={form.discount} onChange={e => setForm({ ...form, discount: e.target.value })} style={inputStyle} />
                        </div>
                    </div>
                    <div>
                        <label style={labelStyle}>Notes</label>
                        <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={2} style={{ ...inputStyle, resize: 'vertical' }} />
                    </div>
                    <button type="submit" style={{
                        padding: '12px', borderRadius: 'var(--radius)', border: 'none',
                        background: 'var(--color-primary)', color: '#fff', fontSize: 14,
                        fontWeight: 600, cursor: 'pointer', marginTop: 4,
                    }}>
                        {editing ? 'Update Sale' : 'Create Sale'}
                    </button>
                </form>
            </Modal>
        </div>
    );
}
