import React from 'react'
import styled from 'styled-components'
import { dateFormat } from '../../utils/dateFormat';
import { bitcoin, book, calender, card, circle, clothing, comment, food, freelance, medical, money, piggy, stocks, takeaway, trash, tv, users, yt, briefcase } from '../../utils/Icons';
import Button from '../Button/Button';

function IncomeItem({
    id,
    title,
    amount,
    date,
    category,
    description,
    deleteItem,
    indicatorColor,
    type
}) {

    // Using a string symbol to prevent [object Object] errors in templates
    const rupeeSymbol = "₹";

    const categoryIcon = () =>{
        switch(category) {
            case 'salary':
                return briefcase || money;
            case 'freelancing':
                return freelance
            case 'investments':
                return stocks;
            case 'stocks':
                return users;
            case 'bitcoin':
                return bitcoin;
            case 'bank':
                return card;
            case 'youtube':
                return yt;
            case 'other':
                return piggy;
            default:
                return ''
        }
    }

    const expenseCatIcon = () => {
        switch (category) {
            case 'education':
            case 'college fees':
                return book;
            case 'groceries':
                return food;
            case 'health':
                return medical;
            case 'subscriptions':
                return tv;
            case 'takeaways':
                return takeaway;
            case 'clothing':
                return clothing;
            case 'travelling':
                return freelance;
            case 'other':
                return circle;
            default:
                return ''
        }
    }

    return (
        <IncomeItemStyled indicator={indicatorColor}>
            <div className="icon">
                {type === 'expense' ? expenseCatIcon() : categoryIcon()}
            </div>
            <div className="content">
                <h5>{title}</h5>
                <div className="inner-content">
                    <div className="text">
                        <p className="amount" style={{ color: type === 'expense' ? '#FF0000' : '#42AD00' }}>
                            {rupeeSymbol} {amount.toLocaleString('en-IN')}
                        </p>
                        <p className="date">{calender} {dateFormat(date)}</p>
                        <p className="description">
                            {comment}
                            {description}
                        </p>
                    </div>
                   <div className="btn-con">
    <Button 
        icon={trash}
        /* Using clamp for responsive padding */
        bPad={'clamp(0.6rem, 2vw, 1rem)'} 
        bRad={'50%'}
        /* Ensure this variable is defined in GlobalStyle.js as #222260 */
        bg={'var(--primary-color)'} 
        /* Explicitly setting the icon color to white */
        color={'#FF0000'} 
        onClick={() => deleteItem(id)}
    />
</div>
                </div>
            </div>
        </IncomeItemStyled>
    )
}

const IncomeItemStyled = styled.div`
    background: rgba(252, 246, 249, 0.78);
    border: 2px solid #FFFFFF;
    backdrop-filter: blur(10px);
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    color: #222260;
    transition: all 0.2s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    }

    .icon{
        width: 60px; /* Reduced from 80px for better mobile fit */
        height: 60px;
        flex-shrink: 0; /* Prevents icon from squishing */
        border-radius: 15px;
        background: #fcf6f9;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid rgba(255, 255, 255, 0.2);
        
        @media screen and (min-width: 768px) {
            width: 80px;
            height: 80px;
            border-radius: 20px;
        }

        i{
            font-size: 1.8rem;
            @media screen and (min-width: 768px) {
                font-size: 2.6rem;
            }
        }
    }

    .content{
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: .2rem;
        min-width: 0; /* Essential for text truncation to work */

        h5{
            font-size: 1.1rem;
            padding-left: 1.5rem;
            position: relative;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            @media screen and (min-width: 768px) {
                font-size: 1.3rem;
                padding-left: 2rem;
            }

            &::before{
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: .6rem;
                height: .6rem;
                border-radius: 50%;
                background: ${props => props.indicator};
            }
        }

        .inner-content{
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 0.5rem;

            .text{
                display: flex;
                flex-direction: column; /* Stack on mobile */
                align-items: flex-start;
                gap: 0.3rem;
                overflow: hidden;

                @media screen and (min-width: 768px) {
                    flex-direction: row;
                    align-items: center;
                    gap: 1.5rem;
                }

                p{
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--primary-color);
                    opacity: 0.8;
                    font-size: 0.85rem;
                    white-space: nowrap;

                    @media screen and (min-width: 768px) {
                        font-size: 1rem;
                    }
                }

                .description {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    max-width: 150px; /* Limits description width on mobile */
                    
                    @media screen and (min-width: 768px) {
                        max-width: none;
                    }
                }

                .amount {
                    font-weight: 700;
                    opacity: 1;
                }
            }
        }
    }

    .btn-con {
        flex-shrink: 0;
    }
`;

export default IncomeItem;