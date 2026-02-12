import { Router } from 'express';
import SalesEntry from '../models/SalesEntry.js';
import ExpenseEntry from '../models/ExpenseEntry.js';

const router = Router();

router.get('/csv', async (req, res, next) => {
  try {
    const { type = 'sales', startDate, endDate } = req.query;
    const filter = {};
    if (startDate) filter.startDate = startDate;
    if (endDate) filter.endDate = endDate;

    let csv = '';
    if (type === 'sales') {
      const sales = await SalesEntry.findRaw(filter);
      csv = 'Date,Product,Category,Quantity,Unit Price,Unit Cost,Discount,Revenue,Cost,Gross Profit\n';
      sales.forEach(s => {
        const revenue = (s.quantity * s.unit_price) - s.discount;
        const cost = s.quantity * s.unit_cost;
        csv += `${new Date(s.date).toISOString().split('T')[0]},${s.product?.name || ''},${s.category?.name || ''},${s.quantity},${s.unit_price},${s.unit_cost},${s.discount},${revenue.toFixed(2)},${cost.toFixed(2)},${(revenue - cost).toFixed(2)}\n`;
      });
    } else {
      const expenses = await ExpenseEntry.findRaw(filter);
      csv = 'Date,Category,Description,Amount,Recurring\n';
      expenses.forEach(e => {
        csv += `${new Date(e.date).toISOString().split('T')[0]},${e.category},"${e.description}",${e.amount.toFixed(2)},${e.is_recurring}\n`;
      });
    }

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=${type}-export.csv`);
    res.send(csv);
  } catch (err) { next(err); }
});

export default router;
