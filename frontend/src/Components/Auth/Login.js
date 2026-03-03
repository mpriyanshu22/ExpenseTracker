import React, { useState } from 'react';
import styled from 'styled-components';
import bg from '../../img/bg.png';
import { useAuth } from '../../context/authContext';

function Login({ onSwitch }) {
  const { login, loading, authError, setAuthError } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setAuthError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form);
    } catch (err) {
      // Error is handled in context
    }
  };

  return (
    <AuthWrapper>
      <AuthCard>
        <h1>Welcome Back</h1>
        <p className="subtitle">Sign in to continue tracking your expenses.</p>
        
        <div className="error-container">
          {authError && <p className="error">{authError}</p>}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-control">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </div>
          <div className="input-control">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
              autoComplete="current-password"
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="switch-text">
          New here?{' '}
          <span onClick={onSwitch} role="button">
            Create an account
          </span>
        </p>
      </AuthCard>
    </AuthWrapper>
  );
}

const AuthWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-image: url(${bg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;

  /* Overlay to ensure readability on mobile */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.05);
    z-index: 0;
  }
`;

const AuthCard = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 2rem 1.5rem;
  border-radius: 24px;
  background: rgba(252, 246, 249, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(15px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
  text-align: center;
  position: relative;
  z-index: 1;

  /* Tablet and Desktop padding */
  @media (min-width: 768px) {
    padding: 2.5rem 2rem;
    max-width: 420px;
    border-radius: 32px;
  }

  h1 {
    margin-bottom: 0.5rem;
    font-size: 1.75rem;
    color: rgba(34, 34, 96, 1);

    @media (min-width: 768px) {
      font-size: 2rem;
    }
  }

  .subtitle {
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
    color: rgba(34, 34, 96, 0.6);

    @media (min-width: 768px) {
      font-size: 0.95rem;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }

  .input-control {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.4rem;

    label {
      font-size: 0.85rem;
      font-weight: 500;
      color: rgba(34, 34, 96, 0.8);
    }

    input {
      width: 100%;
      padding: 0.8rem 1rem;
      border-radius: 12px;
      border: 2px solid #ffffff;
      background: rgba(255, 255, 255, 0.9);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
      outline: none;
      font-family: inherit;
      font-size: 1rem;
      transition: all 0.3s ease;

      &:focus {
        border-color: #f56692;
        background: #fff;
      }
    }
  }

  button {
    margin-top: 1rem;
    padding: 0.9rem 1.5rem;
    border-radius: 15px;
    border: none;
    cursor: pointer;
    background: linear-gradient(135deg, #f56692, #ff9a9e);
    color: #fff;
    font-size: 1rem;
    font-weight: 600;
    box-shadow: 0 8px 20px rgba(245, 102, 146, 0.3);
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 12px 25px rgba(245, 102, 146, 0.4);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  .error-container {
    min-height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .error {
    color: #e91e63;
    background: rgba(233, 30, 99, 0.1);
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-size: 0.85rem;
    width: 100%;
    animation: shake 0.4s ease-in-out;
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(5px); }
    50% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }

  .switch-text {
    margin-top: 1.5rem;
    font-size: 0.9rem;
    color: rgba(34, 34, 96, 0.7);

    span {
      color: #f56692;
      cursor: pointer;
      font-weight: 700;
      text-decoration: underline;

      &:hover {
        color: #ff9a9e;
      }
    }
  }
`;

export default Login;