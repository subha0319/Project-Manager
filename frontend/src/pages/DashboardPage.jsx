import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import * as projectService from '../services/projectService';
import * as taskService from '../services/taskService'; // Import task service
import ProjectList from '../components/ProjectList';
import CreateProjectModal from '../components/CreateProjectModal';
import TaskStatusChart from '../components/TaskStatusChart'; // Import chart component

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]); // State for all tasks
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch both projects and all tasks
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use Promise.all to fetch in parallel
        const [userProjects, userTasks] = await Promise.all([
          projectService.getProjects(),
          taskService.getMyTasks(),
        ]);
        setProjects(userProjects);
        setTasks(userTasks);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  const handleProjectCreated = (newProject) => {
    setProjects([...projects, newProject]);
  };

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <button onClick={logout}>Logout</button>
      <hr />

      {/* Overview Section */}
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <div>
            <h2>At a Glance</h2>
            <p>Total Projects: {projects.length}</p>
            <p>Total Tasks: {tasks.length}</p>
        </div>
        <TaskStatusChart tasks={tasks} />
      </div>
      
      <hr />

      <button onClick={() => setIsModalOpen(true)}>+ Create New Project</button>
      <ProjectList projects={projects} />
      <CreateProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onProjectCreated={handleProjectCreated}
      />
    </div>
  );
};

export default DashboardPage;