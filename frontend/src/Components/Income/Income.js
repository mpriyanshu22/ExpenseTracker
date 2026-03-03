import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';

function Income() {
    const {incomes, getIncomes, deleteIncome, totalIncome} = useGlobalContext()

    useEffect(() =>{
        getIncomes()
    }, [])

    // Standard string symbol to prevent [object Object] errors
    const rupeeSymbol = "₹";

    return (
        <IncomeStyled>
            <InnerLayout>
                <h1>Incomes</h1>
                <h2 className="total-income">
                    Total Income: <span>{rupeeSymbol} {totalIncome().toLocaleString('en-IN')}</span>
                </h2>
                <div className="income-content">
                    <div className="form-container">
                        <Form />
                    </div>
                    <div className="incomes">
                        {incomes.map((income) => {
                            const {_id, title, amount, date, category, description, type} = income;
                            return <IncomeItem
                                key={_id}
                                id={_id} 
                                title={title} 
                                description={description} 
                                amount={amount} 
                                date={date} 
                                type={type}
                                category={category} 
                                indicatorColor="#42AD00"
                                deleteItem={deleteIncome}
                            />
                        })}
                    </div>
                </div>
            </InnerLayout>
        </IncomeStyled>
    )
}

const IncomeStyled = styled.div`
    display: flex;
    overflow: auto;

    h1 {
        @media screen and (max-width: 600px) {
            font-size: 1.5rem;
            text-align: center;
        }
    }

    .total-income {
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
        font-size: 1.8rem;
        gap: .5rem;
        transition: all 0.2s ease;

        @media screen and (max-width: 600px) {
            font-size: 1.2rem;
            flex-direction: column; /* Stacks label and value on small phones */
            padding: 0.8rem;
        }

        &:hover {
            transform: translateY(-2px);
            box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
        }

        span {
            font-size: 2.2rem;
            font-weight: 800;
            color: #42AD00;

            @media screen and (max-width: 600px) {
                font-size: 1.8rem;
            }
        }
    }

    .income-content {
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

        .incomes {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
    }
`;

export default Income;