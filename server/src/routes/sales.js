import { Router } from 'express';
import SalesEntry from '../models/SalesEntry.js';

const router = Router();

// Map Supabase row to frontend format
function toFrontend(row) {
  if (!row) return row;
  return {
    _id: row.id,
    date: row.date,
    product: row.product ? { _id: row.product.id, name: row.product.name, sku: row.product.sku } : row.product_id,
    category: row.category ? { _id: row.category.id, name: row.category.name, color: row.category.color } : row.category_id,
    quantity: row.quantity,
    unitPrice: row.unit_price,
    unitCost: row.unit_cost,
    discount: row.discount,
    notes: row.notes,
    revenue: row.revenue,
    totalCost: row.totalCost,
    grossProfit: row.grossProfit,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// Map frontend body to Supabase column names
function toDb(body) {
  const row = {};
  if (body.date !== undefined) row.date = body.date;
  if (body.product !== undefined) row.product_id = body.product;
  if (body.category !== undefined) row.category_id = body.category;
  if (body.quantity !== undefined) row.quantity = body.quantity;
  if (body.unitPrice !== undefined) row.unit_price = body.unitPrice;
  if (body.unitCost !== undefined) row.unit_cost = body.unitCost;
  if (body.discount !== undefined) row.discount = body.discount;
  if (body.notes !== undefined) row.notes = body.notes;
  return row;
}

// GET all sales (with filters)
router.get('/', async (req, res, next) => {
  try {
    const { startDate, endDate, category, product, page = 1, limit = 50 } = req.query;
    const filter = {};
    if (startDate) filter.startDate = startDate;
    if (endDate) filter.endDate = endDate;
    if (category) filter.category_id = category;
    if (product) filter.product_id = product;

    const result = await SalesEntry.find(filter, { page: Number(page), limit: Number(limit) });
    res.json({
      data: result.data.map(toFrontend),
      total: result.total,
      page: result.page,
      limit: result.limit,
    });
  } catch (err) { next(err); }
});

// GET single
router.get('/:id', async (req, res, next) => {
  try {
    const sale = await SalesEntry.findById(req.params.id);
    if (!sale) return res.status(404).json({ error: 'Sale not found' });
    res.json(toFrontend(sale));
  } catch (err) { next(err); }
});

// POST create
router.post('/', async (req, res, next) => {
  try {
    const sale = await SalesEntry.create(toDb(req.body));
    res.status(201).json(toFrontend(sale));
  } catch (err) { next(err); }
});

// PUT update
router.put('/:id', async (req, res, next) => {
  try {
    const sale = await SalesEntry.update(req.params.id, toDb(req.body));
    if (!sale) return res.status(404).json({ error: 'Sale not found' });
    res.json(toFrontend(sale));
  } catch (err) { next(err); }
});

// DELETE
router.delete('/:id', async (req, res, next) => {
  try {
    const sale = await SalesEntry.delete(req.params.id);
    if (!sale) return res.status(404).json({ error: 'Sale not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
});

export default router;
