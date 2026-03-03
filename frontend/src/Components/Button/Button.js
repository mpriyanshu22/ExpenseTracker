import React from 'react'
import styled from 'styled-components'

function Button({name, icon, onClick, bg, bPad, color, bRad}) {
    return (
        <ButtonStyled 
            style={{
                background: bg,
                padding: bPad,
                borderRadius: bRad,
                color: color,
            }} 
            onClick={onClick}
        >
            {icon && <span className="icon">{icon}</span>}
            {name && <span className="name">{name}</span>}
        </ButtonStyled>
    )
}

const ButtonStyled = styled.button`
    outline: none;
    border: none;
    font-family: inherit;
    font-size: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .5rem;
    cursor: pointer;
    transition: all .4s ease-in-out;
    white-space: nowrap; /* Prevents text from wrapping to a second line */
    width: fit-content;

    .icon {
        display: flex;
        align-items: center;
        font-size: 1.2rem;
    }

    &:active {
        transform: scale(0.95); /* Better feedback for mobile touch */
    }

    /* Mobile Responsive Adjustments */
    @media screen and (max-width: 600px) {
        padding: 0.6rem 1rem !important; /* Forces a consistent mobile size if bPad is too large */
        font-size: 0.9rem;
        gap: 0.4rem;
        
        .icon {
            font-size: 1rem;
        }
    }

    /* Extra Small Screen Adjustment */
    @media screen and (max-width: 400px) {
        width: 100%; /* Makes buttons full-width on very small phones for easier clicking */
    }
`;

export default Button