const ExpenseSchema = require('../models/ExpenseModel');

exports.addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  // Coerce amount to a Number (frontend sends strings)
  const numericAmount = Number(amount);

  const expense = ExpenseSchema({
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

    await expense.save();
    res.status(200).json({ message: 'Expense Added' });
  } catch (error) {
    console.error('Add Expense Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getExpense = async (req, res) => {
  try {
    const expenses = await ExpenseSchema.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  ExpenseSchema.findOneAndDelete({ _id: id, user: req.user._id })
    .then(() => {
      res.status(200).json({ message: 'Expense Deleted' });
    })
    .catch(() => {
      res.status(500).json({ message: 'Server Error' });
    });
};
