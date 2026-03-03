import React from 'react'
import {
    Chart as ChartJs, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext'
import { dateFormat } from '../../utils/dateFormat'

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
)

function Chart() {
    const { incomes, expenses } = useGlobalContext()

    const data = {
        labels: incomes.map((inc) => {
            const { date } = inc
            return dateFormat(date)
        }),
        datasets: [
            {
                label: 'Income',
                data: incomes.map((income) => income.amount),
                backgroundColor: '#42AD00',
                borderColor: '#42AD00',
                tension: .2,
                fill: false
            },
            {
                label: 'Expenses',
                data: expenses.map((expense) => expense.amount),
                backgroundColor: '#FF0000',
                borderColor: '#FF0000',
                tension: .2,
                fill: false
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    boxWidth: 10, // Smaller boxes for mobile
                    font: {
                        size: window.innerWidth < 600 ? 10 : 12 // Dynamic font size
                    }
                }
            },
            tooltip: {
                padding: 10,
                bodyFont: {
                    size: 12
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    font: {
                        size: window.innerWidth < 600 ? 8 : 10
                    },
                    // Shorten large numbers (e.g., 10k instead of 10000)
                    callback: function(value) {
                        if (value >= 1000) return value / 1000 + 'k';
                        return value;
                    }
                }
            },
            x: {
                ticks: {
                    font: {
                        size: window.innerWidth < 600 ? 8 : 10
                    }
                }
            }
        }
    }

    return (
        <ChartStyled>
            <div className="chart-container">
                <Line data={data} options={options} />
            </div>
        </ChartStyled>
    )
}

const ChartStyled = styled.div`
    background: #FFFFFF;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .chart-container {
        height: 300px; /* Reduced height for mobile-first friendliness */
        width: 100%;

        @media screen and (min-width: 768px) {
            height: 400px; /* Taller on desktop */
        }
    }
`;

export default Chart