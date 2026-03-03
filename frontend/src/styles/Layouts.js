import styled from 'styled-components';

export const MainLayout = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
  gap: 1.5rem;
  width: 100%;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const InnerLayout = styled.div`
  padding: 2rem;
  width: 100%;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(15, 23, 42, 0.2);
    border-radius: 999px;
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;