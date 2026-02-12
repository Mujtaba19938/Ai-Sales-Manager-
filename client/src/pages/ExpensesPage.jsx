import { useState, useEffect, useCallback } from 'react';
import { Plus, Pencil, Trash2, Loader, RotateCcw } from 'lucide-react';
import Modal from '../components/shared/Modal';
import { expensesApi } from '../api/client';
import { formatCurrency, formatDate, formatDateInput } from '../utils/formatters';
import { EXPENSE_CATEGORIES } from '../utils/constants';

const emptyForm = { date: '', category: '', description: '', amount: '', isRecurring: false, notes: '' };

export default function ExpensesPage() {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(emptyForm);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const res = await expensesApi.list({ limit: 200 });
            setExpenses(res.data);
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

    const openEdit = (exp) => {
        setEditing(exp._id);
        setForm({
            date: formatDateInput(exp.date),
            category: exp.category,
            description: exp.description,
            amount: String(exp.amount),
            isRecurring: exp.isRecurring,
            notes: exp.notes || '',
        });
        setModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            date: form.date,
            category: form.category,
            description: form.description,
            amount: Number(form.amount),
            isRecurring: form.isRecurring,
            notes: form.notes,
        };
        try {
            if (editing) {
                await expensesApi.update(editing, data);
            } else {
                await expensesApi.create(data);
            }
            setModalOpen(false);
            fetchData();
        } catch (err) {
            alert(err.message);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this expense?')) return;
        await expensesApi.delete(id);
        fetchData();
    };

    const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);

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
                    <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>Expenses</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
                        {expenses.length} entries · Total: {formatCurrency(totalExpenses)}
                    </p>
                </div>
                <button onClick={openAdd} style={{
                    display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px',
                    borderRadius: 'var(--radius)', border: 'none', background: 'var(--color-primary)',
                    color: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                }}>
                    <Plus size={16} /> Add Expense
                </button>
            </div>

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
                    <Loader size={28} style={{ animation: 'spin 1s linear infinite', color: 'var(--color-primary)' }} />
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </div>
            ) : (
                <div style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius)', border: '1px solid var(--border-color)', overflow: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 640 }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                                {['Date', 'Category', 'Description', 'Amount', 'Recurring', ''].map(h => (
                                    <th key={h} style={{ textAlign: 'left', padding: '12px 10px', color: 'var(--text-secondary)', fontWeight: 600 }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.length === 0 ? (
                                <tr><td colSpan={6} style={{ textAlign: 'center', padding: 40, color: 'var(--text-secondary)' }}>No expenses yet. Click "Add Expense" to get started.</td></tr>
                            ) : expenses.map(exp => (
                                <tr key={exp._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                    <td style={{ padding: '10px' }}>{formatDate(exp.date)}</td>
                                    <td style={{ padding: '10px', textTransform: 'capitalize' }}>
                                        <span style={{
                                            padding: '2px 8px', borderRadius: 12, fontSize: 12,
                                            background: '#f43f5e20', color: '#f43f5e',
                                        }}>{exp.category}</span>
                                    </td>
                                    <td style={{ padding: '10px', maxWidth: 250, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{exp.description}</td>
                                    <td style={{ padding: '10px', fontWeight: 600 }}>{formatCurrency(exp.amount)}</td>
                                    <td style={{ padding: '10px' }}>
                                        {exp.isRecurring && <RotateCcw size={14} style={{ color: 'var(--color-primary)' }} />}
                                    </td>
                                    <td style={{ padding: '10px', textAlign: 'center' }}>
                                        <div style={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
                                            <button onClick={() => openEdit(exp)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: 4 }}>
                                                <Pencil size={15} />
                                            </button>
                                            <button onClick={() => handleDelete(exp._id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f43f5e', padding: 4 }}>
                                                <Trash2 size={15} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Expense' : 'New Expense'}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                        <div>
                            <label style={labelStyle}>Date</label>
                            <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Category</label>
                            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required style={inputStyle}>
                                <option value="">Select category...</option>
                                {EXPENSE_CATEGORIES.map(c => <option key={c} value={c} style={{ textTransform: 'capitalize' }}>{c}</option>)}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label style={labelStyle}>Description</label>
                        <input type="text" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required maxLength={300} style={inputStyle} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                        <div>
                            <label style={labelStyle}>Amount ($)</label>
                            <input type="number" min="0.01" step="0.01" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} required style={inputStyle} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'end', paddingBottom: 10 }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, cursor: 'pointer', color: 'var(--text-primary)' }}>
                                <input type="checkbox" checked={form.isRecurring} onChange={e => setForm({ ...form, isRecurring: e.target.checked })} style={{ width: 16, height: 16, accentColor: 'var(--color-primary)' }} />
                                Recurring
                            </label>
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
                        {editing ? 'Update Expense' : 'Create Expense'}
                    </button>
                </form>
            </Modal>
        </div>
    );
}
