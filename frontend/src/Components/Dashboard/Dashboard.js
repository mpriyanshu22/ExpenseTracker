import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layouts';
import { rupee } from '../../utils/Icons';
import Chart from '../Chart/Chart';

function Dashboard() {
    const { totalExpenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext()

    useEffect(() => {
        getIncomes()
        getExpenses()
    }, [])

    const balance = totalBalance();
    const isNegative = balance < 0;

    return (
        <DashboardStyled>
            <InnerLayout>
                <h1>Dashboard</h1>
                
                <div className="balance-summary">
                    <div className="balance-card">
                        <h2>Total Balance</h2>
                        <p className={isNegative ? 'negative' : 'positive'}>
                            {rupee} {Math.abs(balance).toLocaleString('en-IN')}
                        </p>
                    </div>
                    <div className="income-card">
                        <h2>Total Income</h2>
                        <p className="income-amount">
                            {rupee} {totalIncome().toLocaleString('en-IN')}
                        </p>
                    </div>
                    <div className="expense-card">
                        <h2>Total Expense</h2>
                        <p className="expense-amount">
                            {rupee} {totalExpenses().toLocaleString('en-IN')}
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
    .balance-summary {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
        margin-bottom: 2rem;

        @media (max-width: 1024px) {
            grid-template-columns: 1fr;
        }
    }

    .balance-card, .income-card, .expense-card {
        background: rgba(252, 246, 249, 0.78);
        border: 2px solid #FFFFFF;
        backdrop-filter: blur(10px);
        border-radius: 20px;
        padding: 1.5rem;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);

        h2 {
            font-size: 1rem;
            margin-bottom: 0.5rem;
            color: rgba(34, 34, 96, 0.8);
        }

        p {
            font-size: 2.5rem;
            font-weight: 700;
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
            /* Removed background here to let the Chart component handle it */
        }
    }

    .recent-section {
        h2 {
            margin-bottom: 1rem;
            font-size: 1.2rem;
        }
    }
`;

export default Dashboard