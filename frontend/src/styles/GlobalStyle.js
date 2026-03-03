import {createGlobalStyle} from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
    }

    :root{
        --primary-color: #222260;
        /* Fixed: Variables should only contain the value, not 'color:' string */
        --primary-color2: rgba(34, 34, 96, .6);
        --primary-color3: rgba(34, 34, 96, .4);
        --color-green: #42AD00;
        --color-grey: #aaa;
        --color-accent: #F56692;
        --color-delete: #FF0000;
    }

    body{
        font-family: 'Nunito', sans-serif;
        font-size: clamp(1rem, 1.5vw, 1.2rem);
        /* Changed overflow: hidden to auto for mobile scrolling */
        overflow-x: hidden; 
        overflow-y: auto;
        color: var(--primary-color2);
        background-color: #f4f7f6; /* Subtle background for better contrast */
    }

    h1, h2, h3, h4, h5, h6{
        color: var(--primary-color);
    }

    /* Standardized button and input resets for mobile browsers */
    button, input, textarea, select {
        font-family: inherit;
        font-size: inherit;
    }

    .error{
        color: var(--color-delete);
        animation: shake 0.5s ease-in-out;
    }

    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(10px); }
        50% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }

    /* Custom Scrollbar for better UX on desktop */
    ::-webkit-scrollbar {
        width: 6px;
    }
    ::-webkit-scrollbar-thumb {
        background: var(--color-accent);
        border-radius: 10px;
    }
    ::-webkit-scrollbar-track {
        background: transparent;
    }
`;