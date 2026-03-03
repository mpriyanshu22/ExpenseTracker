import React, { useState } from 'react';
import styled from 'styled-components';
import bg from '../../img/bg.png';
import { useAuth } from '../../context/authContext';

function Register({ onSwitch }) {
  const { register, loading, authError, setAuthError } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setAuthError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(form);
  };

  return (
    <AuthWrapper>
      <AuthCard>
        <h1>Create Account</h1>
        <p className="subtitle">Sign up to start managing your money smarter.</p>
        <div className="error-container">
          {authError && <p className="error">{authError}</p>}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-control">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
          </div>
          <div className="input-control">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="input-control">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
              minLength={6}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        <p className="switch-text">
          Already have an account?{' '}
          <span onClick={onSwitch}>
            Sign in
          </span>
        </p>
      </AuthCard>
    </AuthWrapper>
  );
}

const AuthWrapper = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 1.5rem;
  background-image: url(${bg});
  background-size: cover;
  background-position: center;
  position: relative;
`;

const AuthCard = styled.div`
  width: 100%;
  max-width: 420px;
  padding: 2.5rem 2rem;
  border-radius: 32px;
  background: rgba(252, 246, 249, 0.78);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.28);
  text-align: center;
  position: relative;
  z-index: 1;
  h1 {
    margin-bottom: 0.5rem;
    font-size: 2rem;
  }
  .subtitle {
    font-size: 0.95rem;
    margin-bottom: 1.5rem;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .input-control {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.35rem;
    label {
      font-size: 0.9rem;
    }
    input {
      width: 100%;
      padding: 0.7rem 0.9rem;
      border-radius: 12px;
      border: 2px solid #ffffff;
      background: rgba(255, 255, 255, 0.8);
      box-shadow: 0 1px 10px rgba(15, 23, 42, 0.06);
      outline: none;
      font-family: inherit;
      font-size: 0.95rem;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }
    input:focus {
      border-color: var(--color-accent);
      box-shadow: 0 0 0 1px rgba(245, 102, 146, 0.3);
    }
  }
  button {
    margin-top: 0.5rem;
    padding: 0.8rem 1.5rem;
    border-radius: 999px;
    border: none;
    cursor: pointer;
    background: linear-gradient(135deg, #f56692, #ff9a9e);
    color: #fff;
    font-weight: 600;
    letter-spacing: 0.03em;
    box-shadow: 0 10px 25px rgba(245, 102, 146, 0.4);
    transition: transform 0.15s ease, box-shadow 0.15s ease,
      filter 0.2s ease;
  }
  button:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 14px 32px rgba(245, 102, 146, 0.55);
    filter: brightness(1.03);
  }
  button:disabled {
    opacity: 0.7;
    cursor: default;
  }
  .error-container {
    min-height: 1.5rem;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .error {
    color: #FF0000;
    font-size: 0.9rem;
    margin: 0;
    animation: shake 0.5s ease-in-out;
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(10px); }
    50% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
  }

  .switch-text {
    margin-top: 1.2rem;
    font-size: 0.9rem;
    span {
      color: var(--color-accent);
      cursor: pointer;
      font-weight: 600;
    }
  }
`;

export default Register;

