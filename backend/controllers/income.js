const IncomeSchema = require('../models/IncomeModel');

exports.addIncome = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  // Coerce amount to a Number (frontend sends strings)
  const numericAmount = Number(amount);

  const income = IncomeSchema({
    user: req.user._id,
    title,
    amount: numericAmount,
    category,
    description,
    date,
  });

  try {
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      return res
        .status(400)
        .json({ message: 'Amount must be a positive number!' });
    }

    await income.save();
    res.status(200).json({ message: 'Income Added' });
  } catch (error) {
    console.error('Add Income Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getIncomes = async (req, res) => {
  try {
    const incomes = await IncomeSchema.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteIncome = async (req, res) => {
  const { id } = req.params;
  IncomeSchema.findOneAndDelete({ _id: id, user: req.user._id })
    .then(() => {
      res.status(200).json({ message: 'Income Deleted' });
    })
    .catch(() => {
      res.status(500).json({ message: 'Server Error' });
    });
};
