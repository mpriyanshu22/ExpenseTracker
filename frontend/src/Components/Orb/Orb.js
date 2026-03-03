import React from 'react'
import styled, { keyframes } from 'styled-components'
import { useWindowSize } from '../../utils/useWindowSize';

function Orb() {
    const {width, height} = useWindowSize()

    // We pass the dynamic width and height as props to the styled component
    // instead of recreating the keyframes inside the component.
    return (
        <OrbStyled width={width} height={height}></OrbStyled>
    )
}

// Define Keyframes outside to prevent memory leaks and jitter
const moveOrb = (width, height) => keyframes`
    0%{
        transform: translate(0, 0);
    }
    50%{
        transform: translate(${width}px, ${height / 2}px);
    }
    100%{
        transform: translate(0, 0);
    }
`;

const OrbStyled = styled.div`
    width: 70vh;
    height: 70vh;
    position: absolute;
    border-radius: 50%;
    margin-left: -35vh;
    margin-top: -35vh;
    background: linear-gradient(180deg, #F56692 0%, #F2994A 100%);
    filter: blur(200px); /* Reduced blur slightly for better performance on mobile */
    
    /* Use props to dynamically update animation based on screen size */
    animation: ${props => moveOrb(props.width, props.height)} 15s alternate linear infinite;

    /* Mobile adjustments: Shrink the orb so it doesn't overwhelm small screens */
    @media screen and (max-width: 600px) {
        width: 50vh;
        height: 50vh;
        filter: blur(150px);
    }
`;

export default Orb