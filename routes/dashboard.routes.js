import express from 'express';
import { getSummary, getCategoryTotals, getRecentActivity, getTrends } from '../controllers/dashboard.controller.js';
import { protect, authorize } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(protect, authorize('Viewer', 'Analyst', 'Admin'));

router.get('/summary', getSummary);
router.get('/category-totals', getCategoryTotals);
router.get('/recent', getRecentActivity);
router.get('/trends', getTrends);

export default router;
