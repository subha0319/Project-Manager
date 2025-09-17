import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Function to handle one-click demo login
  const handleDemoLogin = async (email, password) => {
    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (error) {
      console.error("Demo login failed", error);
      alert("Demo login failed. Please try again or register a new account.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h1 className="text-5xl font-bold mb-4">Welcome to the Project Manager</h1>
      <p className="text-lg text-gray-300 max-w-2xl mb-8">
        A full-stack, real-time collaborative tool built with the MERN stack and Socket.io.
      </p>

      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Guest Access</h3>
        <p className="text-sm text-gray-400 mb-4">
          Click a button to log in as a demo user. For the full experience, open two different users in separate browser windows to see live collaboration.
        </p>
        <div className="space-y-3">
          <button 
            onClick={() => handleDemoLogin('user1@demo.com', 'password123')} 
            className="w-full py-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700"
          >
            Login as Demo User 1
          </button>
          <button 
            onClick={() => handleDemoLogin('user2@demo.com', 'password123')} 
            className="w-full py-2 font-semibold text-white bg-teal-600 rounded-md hover:bg-teal-700"
          >
            Login as Demo User 2
          </button>
        </div>
        <div className="my-4 text-gray-500">OR</div>
        <Link to="/register" className="font-medium text-blue-500 hover:underline">
          Register Your Own Account
        </Link>
      </div>
    </div>
  );
};

export default HomePage;