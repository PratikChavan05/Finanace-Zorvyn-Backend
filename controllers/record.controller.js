import Record from '../models/Record.js';

export const getRecords = async (req, res) => {
  try {
    const { type, category, startDate, endDate, search, page = 1, limit = 10 } = req.query;
    
    let query = { isDeleted: false };
    if (type) query.type = type;
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const skip = (Number(page) - 1) * Number(limit);

    const records = await Record.find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(Number(limit))
      .populate('createdBy', 'name email');

    const totalRecords = await Record.countDocuments(query);

    res.status(200).json({
      data: records,
      meta: {
        totalRecords,
        currentPage: Number(page),
        totalPages: Math.ceil(totalRecords / Number(limit)),
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRecordById = async (req, res) => {
  try {
    const record = await Record.findOne({ _id: req.params.id, isDeleted: false }).populate('createdBy', 'name email');
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createRecord = async (req, res) => {
  try {
    const { amount, type, category, date, description } = req.body;

    if (!amount || !type || !category) {
      return res.status(400).json({ message: 'Please provide amount, type, and category' });
    }

    const record = await Record.create({
      amount,
      type,
      category,
      date: date ? new Date(date) : Date.now(),
      description,
      createdBy: req.user.id,
    });

    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);

    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }

    const updatedRecord = await Record.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);

    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }

    record.isDeleted = true;
    await record.save();

    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
