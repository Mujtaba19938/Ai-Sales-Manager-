import { Router } from 'express';
import DashboardConfig from '../models/DashboardConfig.js';

const router = Router();

const DEFAULT_ACTIVE_WIDGETS = [
  'stat-revenue', 'stat-profit', 'stat-expenses', 'stat-margin',
  'chart-trend', 'chart-profitloss', 'chart-categories',
  'chart-expenses', 'recent-sales',
];

const DEFAULT_LAYOUT = {
  lg: [
    { i: 'stat-revenue', x: 0, y: 0, w: 3, h: 2 },
    { i: 'stat-profit', x: 3, y: 0, w: 3, h: 2 },
    { i: 'stat-expenses', x: 6, y: 0, w: 3, h: 2 },
    { i: 'stat-margin', x: 9, y: 0, w: 3, h: 2 },
    { i: 'chart-trend', x: 0, y: 2, w: 6, h: 4 },
    { i: 'chart-profitloss', x: 6, y: 2, w: 6, h: 4 },
    { i: 'chart-categories', x: 0, y: 6, w: 4, h: 4 },
    { i: 'chart-expenses', x: 4, y: 6, w: 4, h: 4 },
    { i: 'recent-sales', x: 8, y: 6, w: 4, h: 4 },
  ],
};

// Map Supabase row to frontend format
function toFrontend(row) {
  if (!row) return row;
  return {
    _id: row.id,
    configId: row.config_id,
    layout: row.layout,
    activeWidgets: row.active_widgets,
    theme: row.theme,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// GET config
router.get('/config', async (req, res, next) => {
  try {
    let config = await DashboardConfig.findByConfigId('default');
    if (!config) {
      config = await DashboardConfig.create({
        config_id: 'default',
        layout: DEFAULT_LAYOUT,
        active_widgets: DEFAULT_ACTIVE_WIDGETS,
      });
    }
    res.json(toFrontend(config));
  } catch (err) { next(err); }
});

// PUT full config
router.put('/config', async (req, res, next) => {
  try {
    const updateData = {};
    if (req.body.layout) updateData.layout = req.body.layout;
    if (req.body.activeWidgets) updateData.active_widgets = req.body.activeWidgets;
    if (req.body.theme) updateData.theme = req.body.theme;

    const config = await DashboardConfig.upsert('default', updateData);
    res.json(toFrontend(config));
  } catch (err) { next(err); }
});

// PUT layout only
router.put('/config/layout', async (req, res, next) => {
  try {
    const config = await DashboardConfig.upsert('default', {
      layout: req.body.layout,
      active_widgets: req.body.activeWidgets,
    });
    res.json(toFrontend(config));
  } catch (err) { next(err); }
});

// PUT theme only
router.put('/config/theme', async (req, res, next) => {
  try {
    const config = await DashboardConfig.upsert('default', {
      theme: req.body.theme,
    });
    res.json(toFrontend(config));
  } catch (err) { next(err); }
});

export default router;
