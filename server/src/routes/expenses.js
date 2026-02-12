import { Router } from 'express';
import ExpenseEntry from '../models/ExpenseEntry.js';

const router = Router();

// Map Supabase row to frontend format
function toFrontend(row) {
  if (!row) return row;
  return {
    _id: row.id,
    date: row.date,
    category: row.category,
    description: row.description,
    amount: row.amount,
    isRecurring: row.is_recurring,
    notes: row.notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// Map frontend body to Supabase column names
function toDb(body) {
  const row = {};
  if (body.date !== undefined) row.date = body.date;
  if (body.category !== undefined) row.category = body.category;
  if (body.description !== undefined) row.description = body.description;
  if (body.amount !== undefined) row.amount = body.amount;
  if (body.isRecurring !== undefined) row.is_recurring = body.isRecurring;
  if (body.notes !== undefined) row.notes = body.notes;
  return row;
}

router.get('/', async (req, res, next) => {
  try {
    const { startDate, endDate, category, page = 1, limit = 50 } = req.query;
    const filter = {};
    if (startDate) filter.startDate = startDate;
    if (endDate) filter.endDate = endDate;
    if (category) filter.category = category;

    const result = await ExpenseEntry.find(filter, { page: Number(page), limit: Number(limit) });
    res.json({
      data: result.data.map(toFrontend),
      total: result.total,
      page: result.page,
      limit: result.limit,
    });
  } catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const expense = await ExpenseEntry.findById(req.params.id);
    if (!expense) return res.status(404).json({ error: 'Expense not found' });
    res.json(toFrontend(expense));
  } catch (err) { next(err); }
});

router.post('/', async (req, res, next) => {
  try {
    const expense = await ExpenseEntry.create(toDb(req.body));
    res.status(201).json(toFrontend(expense));
  } catch (err) { next(err); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const expense = await ExpenseEntry.update(req.params.id, toDb(req.body));
    if (!expense) return res.status(404).json({ error: 'Expense not found' });
    res.json(toFrontend(expense));
  } catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const expense = await ExpenseEntry.delete(req.params.id);
    if (!expense) return res.status(404).json({ error: 'Expense not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
});

export default router;
