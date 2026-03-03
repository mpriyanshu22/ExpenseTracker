import React from 'react'
import styled from 'styled-components'

function Button({name, icon, onClick, bg, bPad, color, bRad}) {
    return (
        <ButtonStyled 
            style={{
                background: bg,
                padding: bPad,
                borderRadius: bRad,
                color: color, // This color prop is key for visibility
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
    white-space: nowrap;
    width: fit-content;

    /* Fixed: Added color inherit to make sure icon receives the 'color' prop */
    .icon {
        display: flex;
        align-items: center;
        font-size: 1.2rem;
        color: inherit; 
        
        i {
            color: inherit;
        }
    }

    &:active {
        transform: scale(0.95);
    }

    @media screen and (max-width: 600px) {
        padding: 0.6rem 1rem !important;
        font-size: 0.9rem;
        gap: 0.4rem;
        
        .icon {
            font-size: 1rem;
        }
    }

    @media screen and (max-width: 400px) {
        /* Only apply full width if there is text (name) */
        width: ${props => props.style.borderRadius === '50%' ? 'fit-content' : '100%'};
    }
`;

export default Button