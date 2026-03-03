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
import { useGlobalContext } from './context/globalContext';
import { useAuth } from './context/authContext';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';

function App() {
  const [active, setActive] = useState(1);
  const [showRegister, setShowRegister] = useState(false);
  const global = useGlobalContext();
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
        <main>{displayData()}</main>
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
  padding: 1.5rem;
  display: flex;
  align-items: stretch;
  justify-content: center;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border-radius: 32px;
    overflow: hidden;
    box-shadow: 0 18px 45px rgba(15, 23, 42, 0.28);
    transition: box-shadow 0.2s ease;
    display: flex;
    flex-direction: column;
  }

  main:hover {
    box-shadow: 0 22px 55px rgba(15, 23, 42, 0.35);
  }
`;

export default App;
