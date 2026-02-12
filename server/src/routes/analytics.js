import { Router } from 'express';
import { getSummary, getGrowthRate, getTrends, getCategoryBreakdown, getExpenseBreakdown } from '../services/calculatorService.js';

const router = Router();

router.get('/summary', async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    const summary = await getSummary(startDate, endDate);
    res.json(summary);
  } catch (err) { next(err); }
});

router.get('/trends', async (req, res, next) => {
  try {
    const { startDate, endDate, granularity = 'monthly' } = req.query;
    const trends = await getTrends(startDate, endDate, granularity);
    res.json(trends);
  } catch (err) { next(err); }
});

router.get('/breakdowns', async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    const [categories, expenses] = await Promise.all([
      getCategoryBreakdown(startDate, endDate),
      getExpenseBreakdown(startDate, endDate),
    ]);
    res.json({ categories, expenses });
  } catch (err) { next(err); }
});

router.get('/growth', async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) return res.status(400).json({ error: 'startDate and endDate required' });
    const growth = await getGrowthRate(startDate, endDate);
    res.json(growth);
  } catch (err) { next(err); }
});

export default router;
