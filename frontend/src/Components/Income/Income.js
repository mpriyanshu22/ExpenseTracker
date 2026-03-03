import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';
import { rupee } from '../../utils/Icons';

function Income() {
    const {addIncome,incomes, getIncomes, deleteIncome, totalIncome} = useGlobalContext()

    useEffect(() =>{
        getIncomes()
    }, [])
    return (
        <IncomeStyled>
            <InnerLayout>
                <h1>Incomes</h1>
                <h2 className="total-income">Total Income: <span>{rupee} {totalIncome().toLocaleString('en-IN')}</span></h2>
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
    .total-income{
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(252, 246, 249, 0.78);
        border: 1px solid rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
        transition: all 0.2s ease;

        &:hover {
            transform: translateY(-2px);
            box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
        }

        span{
            font-size: 2.5rem;
            font-weight: 800;
            color: #42AD00;
        }
    }
    .income-content{
        display: flex;
        gap: 2rem;

        @media (max-width: 1024px) {
            flex-direction: column;
        }

        .form-container {
            width: 100%;
            max-width: 400px;

            @media (max-width: 1024px) {
                max-width: 100%;
            }
        }

        .incomes{
            flex: 1;
        }
    }
`;

export default Income