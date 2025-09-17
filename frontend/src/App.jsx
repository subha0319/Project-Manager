import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProjectPage from './pages/ProjectPage';
import HomePage from './pages/HomePage';

function App() {
  const { user } = useAuth();

  return (
    // Set global background and text color
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <HomePage />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <RegisterPage />} />
        <Route path="/dashboard" element={user ? <DashboardPage /> : <Navigate to="/login" />} />
        <Route path="/project/:projectId" element={user ? <ProjectPage /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;


// import React from 'react';
// import { Routes, Route, Link, Navigate } from 'react-router-dom';
// import { useAuth } from './context/AuthContext';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import DashboardPage from './pages/DashboardPage';
// import ProjectPage from './pages/ProjectPage';
// import HomePage from './pages/HomePage';

// // Styled HomePage component
// const HomePage = () => (
//   <div className="flex flex-col items-center justify-center min-h-screen text-center">
//     <h1 className="text-5xl font-bold mb-4">Welcome to the Project Manager</h1>
//     <div className="space-x-4">
//       <Link to="/login" className="px-6 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700">
//         Login
//       </Link>
//       <Link to="/register" className="px-6 py-2 font-semibold text-white bg-gray-600 rounded-md hover:bg-gray-700">
//         Register
//       </Link>
//     </div>
//   </div>
// );

// function App() {
//   const { user } = useAuth();

//   return (
//     // Set global background and text color
//     <div className="bg-gray-900 text-white min-h-screen font-sans">
//       <Routes>
//         <Route path="/" element={user ? <Navigate to="/dashboard" /> : <HomePage />} />
//         <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
//         <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <RegisterPage />} />
//         <Route path="/dashboard" element={user ? <DashboardPage /> : <Navigate to="/login" />} />
//         <Route path="/project/:projectId" element={user ? <ProjectPage /> : <Navigate to="/login" />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;