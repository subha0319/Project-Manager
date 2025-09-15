import React, { useState } from 'react';
import { login } from '../services/authService'; // Import our login function

const LoginPage = () => {
  // State to hold the email and password from the form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Function to handle form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page
    setError(''); // Clear previous errors

    try {
      const user = await login({ email, password });
      console.log('Login successful!', user);
      // Here you would typically redirect the user to the dashboard
      // For now, let's just log to the console and clear the form
      alert('Login successful!');
      setEmail('');
      setPassword('');
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