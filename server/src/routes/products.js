import { Router } from 'express';
import Product from '../models/Product.js';

const router = Router();

// Map Supabase row to frontend format
function toFrontend(row) {
  if (!row) return row;
  return {
    _id: row.id,
    name: row.name,
    sku: row.sku,
    category: row.category ? { _id: row.category.id, name: row.category.name, color: row.category.color } : row.category_id,
    defaultPrice: row.default_price,
    defaultCost: row.default_cost,
    isActive: row.is_active,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// Map frontend body to Supabase column names
function toDb(body) {
  const row = {};
  if (body.name !== undefined) row.name = body.name;
  if (body.sku !== undefined) row.sku = body.sku || null;
  if (body.category !== undefined) row.category_id = body.category;
  if (body.defaultPrice !== undefined) row.default_price = body.defaultPrice;
  if (body.defaultCost !== undefined) row.default_cost = body.defaultCost;
  if (body.isActive !== undefined) row.is_active = body.isActive;
  return row;
}

router.get('/', async (req, res, next) => {
  try {
    const { category, active } = req.query;
    const filter = {};
    if (category) filter.category_id = category;
    if (active !== undefined) filter.is_active = active === 'true';
    const products = await Product.find(filter);
    res.json(products.map(toFrontend));
  } catch (err) { next(err); }
});

router.post('/', async (req, res, next) => {
  try {
    const product = await Product.create(toDb(req.body));
    res.status(201).json(toFrontend(product));
  } catch (err) { next(err); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const product = await Product.update(req.params.id, toDb(req.body));
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(toFrontend(product));
  } catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Product.softDelete(req.params.id);
    res.json({ message: 'Product deactivated' });
  } catch (err) { next(err); }
});

export default router;
