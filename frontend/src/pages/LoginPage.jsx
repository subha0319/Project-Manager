import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAuth } from '../context/AuthContext';    // Import useAuth

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useAuth(); // Get the login function from our context
  const navigate = useNavigate();  // Get the navigate function

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login({ email, password });
      // Redirect to the dashboard on success
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
            onChange={(e) => setEmail(e.target.value)}
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