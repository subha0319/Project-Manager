import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import { useAuth } from '../context/AuthContext';    // 2. Import useAuth

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useAuth(); // 3. Get the login function from our context
  const navigate = useNavigate();  // 4. Get the navigate function

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login({ email, password });
      // 5. Redirect to the dashboard on success
      navigate('/dashboard'); 
    } catch (err) {
      console.error('Failed to login:', err);
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.g.et.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LoginPage;