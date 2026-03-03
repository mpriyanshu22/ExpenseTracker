import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../context/globalContext';
import IncomeItem from '../Components/IncomeItem/IncomeItem';

function History({ limit, full = false }) {
    const { transactionHistory, deleteIncome, deleteExpense } = useGlobalContext()
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [filterType, setFilterType] = useState('all');

    const rupeeSymbol = "₹";
    const history = transactionHistory();

    const filteredHistory = useMemo(() => {
        let filtered = [...history];

        if (searchTerm) {
            filtered = filtered.filter(item =>
                item.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filterCategory !== 'all') {
            filtered = filtered.filter(item => item.category === filterCategory);
        }

        if (filterType !== 'all') {
            filtered = filtered.filter(item => item.type === filterType);
        }

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
        return (
            <HistoryStyled>
                {filteredHistory.length === 0 ? (
                    <p className="no-transactions">No recent transactions</p>
                ) : (
                    filteredHistory.map((item) => {
                        const { _id, title, amount, type } = item;
                        return (
                            <div key={_id} className="history-item">
                                <p className="title" style={{
                                    color: type === 'expense' ? '#FF0000' : '#42AD00'
                                }}>
                                    {title}
                                </p>
                                <p className="amount" style={{
                                    color: type === 'expense' ? '#FF0000' : '#42AD00'
                                }}>
                                    {type === 'expense' ? `- ${rupeeSymbol}${amount <= 0 ? 0 : amount.toLocaleString('en-IN')}` : `+ ${rupeeSymbol}${amount <= 0 ? 0 : amount.toLocaleString('en-IN')}`}
                                </p>
                            </div>
                        );
                    })
                )}
            </HistoryStyled>
        );
    }

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
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        @media screen and (max-width: 600px) {
            padding: 0.8rem;
            border-radius: 15px;
            p { font-size: 0.9rem !important; }
        }

        p {
            font-weight: 600;
            font-size: 1.1rem;
        }

        .amount {
            white-space: nowrap;
            margin-left: 10px;
        }

        .title {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
`;

const HistoryPageStyled = styled.div`
    .header-section {
        margin-bottom: 2rem;
        h1 { margin-bottom: 1.5rem; }
        
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
                padding: .7rem 1rem;
                border-radius: 10px;
                border: 2px solid #fff;
                background: rgba(252, 246, 249, 0.78);
                outline: none;
            }
        }

        .filter-controls {
            display: flex;
            gap: 1rem;
            select {
                flex: 1;
                padding: .7rem;
                border-radius: 10px;
                border: 2px solid #fff;
                background: rgba(252, 246, 249, 0.78);
                cursor: pointer;
            }
        }
    }

    .transactions-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        max-height: 70vh; /* Keeps the list from growing infinitely */
        overflow-y: auto;
        padding-right: 5px;

        /* Custom Scrollbar for better UI */
        &::-webkit-scrollbar { width: 5px; }
        &::-webkit-scrollbar-thumb {
            background: rgba(34, 34, 96, 0.2);
            border-radius: 10px;
        }
    }
`;

export default History;