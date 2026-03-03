import React, { useContext, useState } from 'react';
import axios from 'axios';

const BASE_URL = 'https://expensetracker-backend-0nrd.onrender.com/api/v1/';


axios.defaults.withCredentials = true;

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  const addIncome = async (income) => {
    await axios.post(`${BASE_URL}transactions/add-income`, income).catch((err) => {
      setError(err.response?.data?.message || 'Unable to add income');
    });
    getIncomes();
  };

  const getIncomes = async () => {
    const response = await axios.get(`${BASE_URL}transactions/get-incomes`);
    setIncomes(response.data);
  };

  const deleteIncome = async (id) => {
    await axios.delete(`${BASE_URL}transactions/delete-income/${id}`);
    getIncomes();
  };

  const totalIncome = () => {
    return incomes.reduce((acc, income) => acc + (income.amount || 0), 0);
  };

  const addExpense = async (expense) => {
    await axios.post(`${BASE_URL}transactions/add-expense`, expense).catch((err) => {
      setError(err.response?.data?.message || 'Unable to add expense');
    });
    getExpenses();
  };

  const getExpenses = async () => {
    const response = await axios.get(`${BASE_URL}transactions/get-expenses`);
    setExpenses(response.data);
  };

  const deleteExpense = async (id) => {
    await axios.delete(`${BASE_URL}transactions/delete-expense/${id}`);
    getExpenses();
  };

  const totalExpenses = () => {
    return expenses.reduce((acc, expense) => acc + (expense.amount || 0), 0);
  };

  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  const transactionHistory = (limit = 3) => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return typeof limit === 'number' ? history.slice(0, limit) : history;
  };

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        expenses,
        totalIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpenses,
        totalBalance,
        transactionHistory,
        error,
        setError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
