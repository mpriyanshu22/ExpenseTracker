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

    // Options to control responsiveness and prevent overflow
    const options = {
        responsive: true,
        maintainAspectRatio: false, // Allows the chart to fill the container height
        scales: {
            y: {
                beginAtZero: true,
            }
        }
    }

    return (
        <ChartStyled>
            <Line data={data} options={options} />
        </ChartStyled>
    )
}

const ChartStyled = styled.div`
    background: #FFFFFF;
    border: 1px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 400px; /* Fixed height prevents vertical overflow */
    width: 100%;   /* Ensures it stays within parent */
`;

export default Chart