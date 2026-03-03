import React, { useContext, useState } from 'react';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL||'http://localhost:5000/api/v1/';

// Global default for axios
axios.defaults.withCredentials = true;

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  // --- INCOME ACTIONS ---
  const addIncome = async (income) => {
    setError(null);
    try {
      await axios.post(`${BASE_URL}transactions/add-income`, income, {
        withCredentials: true 
      });
      await getIncomes();
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to add income');
    }
  };

  const getIncomes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}transactions/get-incomes`, {
        withCredentials: true // Required to identify the user
      });
      setIncomes(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to fetch incomes');
    }
  };

  const deleteIncome = async (id) => {
    try {
      await axios.delete(`${BASE_URL}transactions/delete-income/${id}`, {
        withCredentials: true
      });
      await getIncomes();
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to delete income');
    }
  };

  // --- EXPENSE ACTIONS ---
  const addExpense = async (expense) => {
    setError(null);
    try {
      await axios.post(`${BASE_URL}transactions/add-expense`, expense, {
        withCredentials: true,
      });
      await getExpenses(); 
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to add expense');
    }
  };

  const getExpenses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}transactions/get-expenses`, {
        withCredentials: true // Required to identify the user
      });
      setExpenses(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to fetch expenses');
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${BASE_URL}transactions/delete-expense/${id}`, {
        withCredentials: true
      });
      await getExpenses();
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to delete expense');
    }
  };

  // --- CALCULATIONS ---
  const totalIncome = () => incomes.reduce((acc, income) => acc + (income.amount || 0), 0);
  const totalExpenses = () => expenses.reduce((acc, expense) => acc + (expense.amount || 0), 0);
  const totalBalance = () => totalIncome() - totalExpenses();

  const transactionHistory = (limit = 3) => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
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

export const useGlobalContext = () => useContext(GlobalContext);