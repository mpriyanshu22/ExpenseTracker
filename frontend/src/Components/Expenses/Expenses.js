import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import IncomeItem from '../IncomeItem/IncomeItem';
import ExpenseForm from './ExpenseForm';

function Expenses() {
    const {expenses, getExpenses, deleteExpense, totalExpenses} = useGlobalContext()

    useEffect(() =>{
        getExpenses()
    }, [])

    // Use string symbol to prevent [object Object] rendering
    const rupeeSymbol = "₹";

    return (
        <ExpenseStyled>
            <InnerLayout>
                <h1>Expenses</h1>
                <h2 className="total-expense">
                    Total Expense: <span>{rupeeSymbol} {totalExpenses().toLocaleString('en-IN')}</span>
                </h2>
                <div className="expense-content">
                    <div className="form-container">
                        <ExpenseForm />
                    </div>
                    <div className="expenses">
                        {expenses.map((expense) => {
                            const {_id, title, amount, date, category, description, type} = expense;
                            return <IncomeItem
                                key={_id}
                                id={_id} 
                                title={title} 
                                description={description} 
                                amount={amount} 
                                date={date} 
                                type={type}
                                category={category} 
                                indicatorColor="#FF0000"
                                deleteItem={deleteExpense}
                            />
                        })}
                    </div>
                </div>
            </InnerLayout>
        </ExpenseStyled>
    )
}

const ExpenseStyled = styled.div`
    display: flex;
    overflow: auto;

    h1 {
        @media screen and (max-width: 600px) {
            font-size: 1.5rem;
            text-align: center;
        }
    }

    .total-expense {
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(252, 246, 249, 0.78);
        border: 2px solid #FFFFFF;
        backdrop-filter: blur(10px);
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 1.8rem; /* Slightly smaller base size */
        gap: .5rem;
        transition: all 0.2s ease;

        @media screen and (max-width: 600px) {
            font-size: 1.2rem;
            flex-direction: column; /* Stack label and amount if too tight */
            padding: 0.8rem;
        }

        &:hover {
            transform: translateY(-2px);
            box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
        }

        span {
            font-size: 2.2rem;
            font-weight: 800;
            color: #FF0000;

            @media screen and (max-width: 600px) {
                font-size: 1.8rem;
            }
        }
    }

    .expense-content {
        display: flex;
        gap: 2rem;

        @media (max-width: 1024px) {
            flex-direction: column;
            gap: 1.5rem;
        }

        .form-container {
            width: 100%;
            max-width: 400px;

            @media (max-width: 1024px) {
                max-width: 100%;
            }
        }

        .expenses {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
    }
`;

export default Expenses