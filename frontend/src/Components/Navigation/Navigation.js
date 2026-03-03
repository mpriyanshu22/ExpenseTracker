import React, { useState } from 'react';
import styled from 'styled-components';
import avatar from '../../img/avatar.png';
import { signout } from '../../utils/Icons';
import { menuItems } from '../../utils/menuItems';

function Navigation({ active, setActive, onSignOut, user }) {
  const [open, setOpen] = useState(false);

  const handleNavClick = (id) => {
    setActive(id);
    setOpen(false);
  };

  return (
    <NavStyled open={open}>
      <div className="nav-inner">
        <div className="user-con">
          <img src={avatar} alt="" />
          <div className="text">
            <h2>{user?.name || 'User'}</h2>
            <p>Your Money</p>
          </div>
          <button
            className="hamburger"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <ul className={`menu-items ${open ? 'open' : ''}`}>
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
  );
}

const NavStyled = styled.nav`
  padding: 1.8rem 1.5rem;
  width: 300px;
  min-width: 300px;
  height: 100%;
  background: rgba(252, 246, 249, 0.78);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5rem;
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.28);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  flex-shrink: 0;

  .nav-inner {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 22px 55px rgba(15, 23, 42, 0.35);
  }

  .user-con {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.5rem;
    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      object-fit: cover;
      background: #fcf6f9;
      border: 2px solid #ffffff;
      padding: 0.15rem;
      box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.08);
    }
    h2 {
      color: rgba(34, 34, 96, 1);
      font-size: 1.2rem;
    }
    p {
      color: rgba(34, 34, 96, 0.6);
      font-size: 0.9rem;
    }
  }

  .hamburger {
    margin-left: auto;
    width: 38px;
    height: 32px;
    border-radius: 999px;
    border: none;
    background: rgba(255, 255, 255, 0.9);
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    cursor: pointer;
    box-shadow: 0 6px 14px rgba(15, 23, 42, 0.2);
    padding: 0;
    span {
      width: 18px;
      height: 2px;
      border-radius: 999px;
      background: #222260;
      transition: background 0.2s ease;
    }
  }

  .menu-items {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    li {
      display: grid;
      grid-template-columns: 32px auto;
      align-items: center;
      margin: 0.4rem 0;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.25s ease-in-out;
      color: rgba(34, 34, 96, 0.6);
      padding: 0.45rem 0.9rem;
      border-radius: 999px;
      position: relative;
      i {
        color: rgba(34, 34, 96, 0.6);
        font-size: 1.2rem;
        transition: all 0.25s ease-in-out;
      }
      &:hover {
        background: rgba(255, 255, 255, 0.9);
        color: rgba(34, 34, 96, 0.9);
        transform: translateX(2px);
      }
    }
  }

  .active {
    color: rgba(34, 34, 96, 1) !important;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 10px 18px rgba(15, 23, 42, 0.18);
    i {
      color: rgba(34, 34, 96, 1) !important;
    }
  }

  .bottom-nav {
    margin-top: 1.5rem;
    button {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
      padding: 0.65rem 1rem;
      border-radius: 999px;
      border: none;
      background: rgba(255, 255, 255, 0.9);
      cursor: pointer;
      color: rgba(34, 34, 96, 0.8);
      font-weight: 600;
      box-shadow: 0 8px 18px rgba(15, 23, 42, 0.18);
      transition: all 0.2s ease;
      span {
        font-size: 0.95rem;
      }
      &:hover {
        background: rgba(245, 102, 146, 0.95);
        color: #fff;
        transform: translateY(-1px);
        box-shadow: 0 12px 26px rgba(245, 102, 146, 0.45);
      }
    }
  }

  @media (max-width: 1024px) {
    position: fixed;
    z-index: 100;
    top: 1rem;
    left: 1rem;
    width: 280px;
    max-width: calc(100vw - 2rem);
    transform: ${props => props.open ? 'translateX(0)' : 'translateX(calc(-100% - 1rem))'};
    transition: transform 0.3s ease;
    
    .hamburger {
      display: flex;
    }
    
    .menu-items {
      display: ${props => props.open ? 'flex' : 'none'};
    }
  }

  @media (max-width: 768px) {
    width: calc(100vw - 2rem);
    max-width: calc(100vw - 2rem);
    border-radius: 24px;
    .nav-inner {
      height: auto;
    }
    .bottom-nav {
      margin-top: 0.5rem;
    }
  }
`;

export default Navigation;