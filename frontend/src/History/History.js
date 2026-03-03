import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../context/globalContext';
import { rupee } from '../utils/Icons';
import IncomeItem from '../Components/IncomeItem/IncomeItem';

function History({ limit, full = false }) {
    const { transactionHistory, incomes, expenses, deleteIncome, deleteExpense } = useGlobalContext()
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [filterType, setFilterType] = useState('all');

    const history = transactionHistory();

    const filteredHistory = useMemo(() => {
        let filtered = [...history];

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(item =>
                item.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply category filter
        if (filterCategory !== 'all') {
            filtered = filtered.filter(item => item.category === filterCategory);
        }

        // Apply type filter
        if (filterType !== 'all') {
            filtered = filtered.filter(item => item.type === filterType);
        }

        // Apply limit if specified
        if (limit) {
            filtered = filtered.slice(0, limit);
        }

        return filtered;
    }, [history, searchTerm, filterCategory, filterType, limit]);

    const allCategories = useMemo(() => {
        const cats = new Set();
        history.forEach(item => cats.add(item.category));
        return Array.from(cats);
    }, [history]);

    if (!full) {
        // Simple recent history view for Dashboard
        return (
            <HistoryStyled>
                {filteredHistory.length === 0 ? (
                    <p className="no-transactions">No recent transactions</p>
                ) : (
                    filteredHistory.map((item) => {
                        const { _id, title, amount, type } = item;
                        return (
                            <div key={_id} className="history-item">
                                <p style={{
                                    color: type === 'expense' ? '#FF0000' : '#42AD00'
                                }}>
                                    {title}
                                </p>
                                <p style={{
                                    color: type === 'expense' ? '#FF0000' : '#42AD00'
                                }}>
                                    {type === 'expense' ? `-${rupee} ${amount <= 0 ? 0 : amount.toLocaleString('en-IN')}` : `+${rupee} ${amount <= 0 ? 0 : amount.toLocaleString('en-IN')}`}
                                </p>
                            </div>
                        );
                    })
                )}
            </HistoryStyled>
        );
    }

    // Full history page with search and filters
    return (
        <HistoryPageStyled>
            <div className="header-section">
                <h1>Transaction History</h1>
                <div className="filters">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search by title..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="filter-controls">
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                        >
                            <option value="all">All Types</option>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                        >
                            <option value="all">All Categories</option>
                            {allCategories.map(cat => (
                                <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="transactions-list">
                {filteredHistory.length === 0 ? (
                    <div className="no-transactions">
                        <p>No transactions found</p>
                    </div>
                ) : (
                    filteredHistory.map((item) => {
                        const { _id, title, amount, date, category, description, type } = item;
                        return (
                            <IncomeItem
                                key={_id}
                                id={_id}
                                title={title}
                                description={description}
                                amount={amount}
                                date={date}
                                type={type}
                                category={category}
                                indicatorColor={type === 'expense' ? '#FF0000' : '#42AD00'}
                                deleteItem={type === 'expense' ? deleteExpense : deleteIncome}
                            />
                        );
                    })
                )}
            </div>
        </HistoryPageStyled>
    );
}

const HistoryStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    
    .history-item {
        background: rgba(252, 246, 249, 0.78);
        border: 1px solid rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: all 0.2s ease;

        &:hover {
            transform: translateX(4px);
            box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
        }

        p {
            font-weight: 600;
            font-size: 1rem;
        }
    }

    .no-transactions {
        text-align: center;
        padding: 2rem;
        color: rgba(34, 34, 96, 0.5);
    }
`;

const HistoryPageStyled = styled.div`
    .header-section {
        margin-bottom: 2rem;

        h1 {
            padding-left: 8px;
            margin-bottom: 1.5rem;
        }

        .filters {
            display: flex;
            flex-direction: column;
            gap: 1rem;

            @media (min-width: 768px) {
                flex-direction: row;
                align-items: center;
            }
        }

        .search-bar {
            flex: 1;

            input {
                width: 100%;
                padding: 0.75rem 1rem;
                border-radius: 12px;
                border: 1px solid rgba(255, 255, 255, 0.2);
                background: rgba(252, 246, 249, 0.78);
                backdrop-filter: blur(10px);
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                color: rgba(34, 34, 96, 0.9);
                font-family: inherit;
                font-size: inherit;
                outline: none;
                transition: all 0.2s ease;

                &:focus {
                    border-color: var(--color-accent);
                    box-shadow: 0 0 0 2px rgba(245, 102, 146, 0.2);
                }

                &::placeholder {
                    color: rgba(34, 34, 96, 0.4);
                }
            }
        }

        .filter-controls {
            display: flex;
            gap: 1rem;

            select {
                padding: 0.75rem 1rem;
                border-radius: 12px;
                border: 1px solid rgba(255, 255, 255, 0.2);
                background: rgba(252, 246, 249, 0.78);
                backdrop-filter: blur(10px);
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                color: rgba(34, 34, 96, 0.9);
                font-family: inherit;
                font-size: inherit;
                outline: none;
                cursor: pointer;
                transition: all 0.2s ease;

                &:focus {
                    border-color: var(--color-accent);
                    box-shadow: 0 0 0 2px rgba(245, 102, 146, 0.2);
                }
            }
        }
    }

    .transactions-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .no-transactions {
        text-align: center;
        padding: 3rem;
        background: rgba(252, 246, 249, 0.78);
        border: 1px solid rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        color: rgba(34, 34, 96, 0.5);
    }
`;

export default History
