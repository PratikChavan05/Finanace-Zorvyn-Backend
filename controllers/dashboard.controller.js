import Record from '../models/Record.js';

export const getSummary = async (req, res) => {
  try {
    const summary = await Record.aggregate([
      { $match: { isDeleted: false } },
      {
        $group: {
          _id: '$type',
          total: { $sum: '$amount' }
        }
      }
    ]);

    let totalIncome = 0;
    let totalExpense = 0;

    summary.forEach(item => {
      if (item._id === 'income') totalIncome = item.total;
      if (item._id === 'expense') totalExpense = item.total;
    });

    res.json({
      totalIncome,
      totalExpense,
      netBalance: totalIncome - totalExpense
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCategoryTotals = async (req, res) => {
  try {
    const totals = await Record.aggregate([
      { $match: { isDeleted: false } },
      {
        $group: {
          _id: { type: '$type', category: '$category' },
          total: { $sum: '$amount' }
        }
      },
      {
        $project: {
          _id: 0,
          type: '$_id.type',
          category: '$_id.category',
          total: 1
        }
      }
    ]);

    res.json(totals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRecentActivity = async (req, res) => {
  try {
    const recent = await Record.find({ isDeleted: false })
      .sort({ date: -1 })
      .limit(10)
      .populate('createdBy', 'name email');
    
    res.json(recent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTrends = async (req, res) => {
  try {
    const trends = await Record.aggregate([
      { $match: { isDeleted: false } },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' },
            type: '$type'
          },
          total: { $sum: '$amount' }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    res.json(trends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
