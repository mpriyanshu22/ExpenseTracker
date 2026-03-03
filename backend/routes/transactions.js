const {
  addExpense,
  getExpense,
  deleteExpense,
} = require('../controllers/expense');
const {
  addIncome,
  getIncomes,
  deleteIncome,
} = require('../controllers/income');
const { protect } = require('../middleware/authMiddleware');

const router = require('express').Router();

router
  .post('/add-income', protect, addIncome)
  .get('/get-incomes', protect, getIncomes)
  .delete('/delete-income/:id', protect, deleteIncome)
  .post('/add-expense', protect, addExpense)
  .get('/get-expenses', protect, getExpense)
  .delete('/delete-expense/:id', protect, deleteExpense);

module.exports = router;