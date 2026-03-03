import styled from 'styled-components';

export const MainLayout = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
  gap: 1.5rem;
  width: 100%;
  padding: 1.5rem; /* Added padding to give the dashboard a "floating" card look */

  @media (max-width: 1024px) {
    flex-direction: column;
    height: auto; /* Allow height to expand on mobile */
    min-height: 100vh;
    overflow: visible; /* Allow the whole page to scroll on mobile */
    padding: 1rem;
    gap: 1rem;
  }
`;

export const InnerLayout = styled.div`
  padding: 2rem;
  width: 100%;
  flex: 1;
  background: rgba(252, 246, 249, 0.78);
  border: 2px solid #FFFFFF;
  backdrop-filter: blur(10px);
  border-radius: 32px;
  overflow-y: auto;
  overflow-x: hidden;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--color-accent); /* Using your accent color for the scrollbar */
    border-radius: 999px;
  }
  
  @media (max-width: 768px) {
    padding: 1rem;
    border-radius: 20px; /* Slightly sharper corners for mobile */
  }
`;