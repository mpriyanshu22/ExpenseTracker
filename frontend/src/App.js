import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import bg from './img/bg.png';
import { MainLayout } from './styles/Layouts';
import Orb from './Components/Orb/Orb';
import Navigation from './Components/Navigation/Navigation';
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income';
import Expenses from './Components/Expenses/Expenses';
import History from './History/History';
import { useAuth } from './context/authContext';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';

function App() {
  const [active, setActive] = useState(1);
  const [showRegister, setShowRegister] = useState(false);
  const { user, token, logout } = useAuth();

  const isAuthenticated = !!token;

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <History full />;
      case 3:
        return <Income />;
      case 4:
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  };

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  if (!isAuthenticated) {
    return showRegister ? (
      <Register onSwitch={() => setShowRegister(false)} />
    ) : (
      <Login onSwitch={() => setShowRegister(true)} />
    );
  }

  return (
    <AppStyled bg={bg} className="App">
      {orbMemo}
      <MainLayout>
        <Navigation
          active={active}
          setActive={setActive}
          onSignOut={logout}
          user={user}
        />
        <main>
          {displayData()}
        </main>
      </MainLayout>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;

  /* Mobile Responsive Adjustments */
  @media screen and (max-width: 1024px) {
    height: auto;
    min-height: 100vh;
    overflow: auto;
  }

  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(10px);
    border-radius: 32px;
    overflow-x: hidden;
    overflow-y: auto; /* Allows the main content area to scroll independently on desktop */
    box-shadow: 0 18px 45px rgba(15, 23, 42, 0.28);
    
    @media screen and (max-width: 1024px) {
      border-radius: 20px;
      margin-top: 4rem; /* Makes room for the fixed hamburger menu */
    }

    @media screen and (max-width: 768px) {
       margin-top: 5rem;
       padding-bottom: 2rem;
    }

    /* Custom Scrollbar for the main content area */
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background: #F56692;
      border-radius: 10px;
    }
  }
`;

export default App;