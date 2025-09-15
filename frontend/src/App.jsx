// import './App.css';

// function App() {
//   return (
//     <div>
//       <h1>Project Management App</h1>
//     </div>
//   );
// }

import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProjectPage from './pages/ProjectPage';
import './App.css';

// A simple home page for logged-out users
const HomePage = () => (
  <div>
    <h1>Welcome to the Project Manager</h1>
    <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
  </div>
);

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      <Routes>
        {/* Public routes that are only accessible when logged out */}
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" /> : <HomePage />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/dashboard" /> : <RegisterPage />}
        />

        {/* Protected routes that are only accessible when logged in */}
        <Route
          path="/dashboard"
          element={user ? <DashboardPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/project/:projectId"
          element={user ? <ProjectPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
