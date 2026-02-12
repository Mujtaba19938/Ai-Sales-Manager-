import { Router } from 'express';
import Category from '../models/Category.js';

const router = Router();

// Map Supabase row to frontend format
function toFrontend(row) {
  if (!row) return row;
  return {
    _id: row.id,
    name: row.name,
    color: row.color,
    type: row.type,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.json(categories.map(toFrontend));
  } catch (err) { next(err); }
});

router.post('/', async (req, res, next) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(toFrontend(category));
  } catch (err) { next(err); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const category = await Category.update(req.params.id, req.body);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json(toFrontend(category));
  } catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Category.delete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
});

export default router;
