import React, { useState } from 'react';
import styled from 'styled-components';
import avatar from '../../img/avatar.png';
import { signout } from '../../utils/Icons';
import { menuItems } from '../../utils/menuItems';

function Navigation({ active, setActive, onSignOut, user }) {
  const [open, setOpen] = useState(false);

  const handleNavClick = (id) => {
    setActive(id);
    setOpen(false); // Auto-close menu on mobile after selection
  };

  return (
    <>
      {/* Overlay for mobile to close menu when clicking outside */}
      {open && <NavOverlay onClick={() => setOpen(false)} />}
      
      <NavStyled open={open}>
        <div className="nav-inner">
          <div className="user-con">
            <img src={avatar} alt="User Avatar" />
            <div className="text">
              <h2>{user?.name || 'User'}</h2>
              <p>Your Money</p>
            </div>
            {/* Hamburger button visible only on mobile/tablet */}
            <button
              className="hamburger"
              onClick={() => setOpen((prev) => !prev)}
              aria-label="Toggle navigation"
            >
              <div className={`line ${open ? 'open' : ''}`} />
              <div className={`line ${open ? 'open' : ''}`} />
              <div className={`line ${open ? 'open' : ''}`} />
            </button>
          </div>

          <ul className="menu-items">
            {menuItems.map((item) => {
              return (
                <li
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={active === item.id ? 'active' : ''}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </li>
              );
            })}
          </ul>

          <div className="bottom-nav">
            <button type="button" onClick={onSignOut}>
              {signout} <span>Sign Out</span>
            </button>
          </div>
        </div>
      </NavStyled>
    </>
  );
}

const NavOverlay = styled.div`
  @media (max-width: 1024px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(2px);
    z-index: 99;
  }
`;

const NavStyled = styled.nav`
  padding: 1.8rem 1.5rem;
  width: 300px;
  min-width: 300px;
  height: 100%;
  background: rgba(252, 246, 249, 0.78);
  border: 2px solid #FFFFFF;
  backdrop-filter: blur(10px);
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5rem;
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.28);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;

  .nav-inner {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .user-con {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      object-fit: cover;
      background: #fcf6f9;
      border: 2px solid #ffffff;
      padding: 0.15rem;
      box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.08);
    }
    h2 { color: rgba(34, 34, 96, 1); font-size: 1.1rem; }
    p { color: rgba(34, 34, 96, 0.6); font-size: 0.8rem; }
  }

  .hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    border: none;
    background: none;
    cursor: pointer;
    .line {
      width: 25px;
      height: 3px;
      background: #222260;
      border-radius: 10px;
      transition: all 0.3s ease;
    }
  }

  .menu-items {
    flex: 1;
    display: flex;
    flex-direction: column;
    li {
      display: grid;
      grid-template-columns: 40px auto;
      align-items: center;
      margin: 0.5rem 0;
      font-weight: 500;
      cursor: pointer;
      color: rgba(34, 34, 96, 0.6);
      padding: 0.6rem 1rem;
      border-radius: 15px;
      transition: all 0.3s ease;
      
      i { font-size: 1.3rem; }
      
      &:hover {
        background: rgba(255, 255, 255, 0.6);
        color: rgba(34, 34, 96, 1);
      }
    }
    .active {
      color: rgba(34, 34, 96, 1) !important;
      background: #FFFFFF !important;
      box-shadow: 0 5px 15px rgba(0,0,0,0.05);
    }
  }

  .bottom-nav {
    button {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 0.8rem;
      padding: 0.8rem 1.2rem;
      border-radius: 15px;
      border: none;
      background: rgba(255, 255, 255, 0.5);
      cursor: pointer;
      font-weight: 600;
      color: rgba(34, 34, 96, 0.6);
      transition: all 0.3s ease;
      
      &:hover {
        background: #f56692;
        color: #fff;
      }
    }
  }

  /* Mobile/Tablet Breakpoint */
  @media screen and (max-width: 1024px) {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    height: 100vh;
    border-radius: 0 32px 32px 0;
    transform: ${props => props.open ? 'translateX(0)' : 'translateX(-100%)'};
    
    .hamburger {
      display: flex;
      position: absolute;
      right: -60px; /* Moves hamburger outside the drawer when closed */
      top: 25px;
      background: #fff;
      padding: 10px;
      border-radius: 12px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
  }

  @media screen and (max-width: 400px) {
    width: 85%; /* Slightly smaller for very small phones */
  }
`;

export default Navigation;