import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layouts';
import Chart from '../Chart/Chart';

function Dashboard() {
    const { totalExpenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext()

    useEffect(() => {
        getIncomes()
        getExpenses()
    }, [])

    const balance = totalBalance();
    const isNegative = balance < 0;
    
    // Using a string symbol to prevent [object Object] errors in templates
    const rupeeSymbol = "₹";

    return (
        <DashboardStyled>
            <InnerLayout>
                <h1>Dashboard</h1>
                
                <div className="balance-summary">
                    <div className="balance-card">
                        <h2>Total Balance</h2>
                        <p className={isNegative ? 'negative' : 'positive'}>
                            {rupeeSymbol} {Math.abs(balance).toLocaleString('en-IN')}
                        </p>
                    </div>
                    <div className="income-card">
                        <h2>Total Income</h2>
                        <p className="income-amount">
                            {rupeeSymbol} {totalIncome().toLocaleString('en-IN')}
                        </p>
                    </div>
                    <div className="expense-card">
                        <h2>Total Expense</h2>
                        <p className="expense-amount">
                            {rupeeSymbol} {totalExpenses().toLocaleString('en-IN')}
                        </p>
                    </div>
                </div>

                <div className="chart-section">
                    <h2>All Transactions</h2>
                    <div className="chart-container">
                        <Chart />
                    </div>
                </div>

                <div className="recent-section">
                    <h2>Recent Transactions</h2>
                    <History limit={3} />
                </div>
            </InnerLayout>
        </DashboardStyled>
    )
}

const DashboardStyled = styled.div`
    h1 {
        font-size: 1.8rem;
        margin-bottom: 1.5rem;
        
        @media screen and (max-width: 600px) {
            font-size: 1.5rem;
            text-align: center;
        }
    }

    .balance-summary {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
        margin-bottom: 2rem;

        /* Tablet View */
        @media screen and (max-width: 1024px) {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
        }

        /* Mobile View */
        @media screen and (max-width: 600px) {
            grid-template-columns: 1fr;
            margin-bottom: 1.5rem;
        }
    }

    .balance-card, .income-card, .expense-card {
        background: rgba(252, 246, 249, 0.78);
        border: 2px solid #FFFFFF;
        backdrop-filter: blur(10px);
        border-radius: 20px;
        padding: 1.5rem;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        text-align: center;

        @media screen and (max-width: 600px) {
            padding: 1rem;
            border-radius: 15px;
        }

        h2 {
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
            color: rgba(34, 34, 96, 0.8);

            @media screen and (max-width: 600px) {
                font-size: 0.8rem;
            }
        }

        p {
            font-size: 2rem;
            font-weight: 700;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

            @media screen and (max-width: 768px) {
                font-size: 1.8rem;
            }
        }

        .positive, .income-amount { color: #42AD00; }
        .negative, .expense-amount { color: #FF0000; }
    }

    .chart-section {
        margin-bottom: 2rem;
        width: 100%;
        
        h2 {
            margin-bottom: 1rem;
            font-size: 1.2rem;
        }

        .chart-container {
            width: 100%;
            /* Container helps Chart component maintain its own responsive boundaries */
        }
    }

    .recent-section {
        h2 {
            margin-bottom: 1rem;
            font-size: 1.2rem;
        }
    }
`;

export default Dashboard;