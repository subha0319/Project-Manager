import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as projectService from '../services/projectService';
import * as taskService from '../services/taskService';
import TaskColumn from '../components/TaskColumn';
import TaskModal from '../components/TaskModal';
import socket from '../services/socketService'; // Import the socket

const ProjectPage = () => {
  const { projectId } = useParams(); // Get project ID from URL
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const fetchProjectData = async () => {
    try {
      const projectData = await projectService.getProjectById(projectId);
      const tasksData = await taskService.getTasksForProject(projectId);
      setProject(projectData);
      setTasks(tasksData);
    } catch (error) {
      console.error("Failed to fetch project data", error);
    }
  };

  // Add a useEffect for Socket.io
  useEffect(() => {
    // Join the project room when the component mounts
    socket.emit('joinProject', projectId);

    // Listen for 'taskUpdated' events from the server
    const handleTaskUpdate = (updatedTask) => {
      // Update the local state with the new task data
      setTasks(currentTasks => 
        currentTasks.map(task => 
          task._id === updatedTask._id ? updatedTask : task
        )
      );
    };
    
    socket.on('taskUpdated', handleTaskUpdate);

    // --- Cleanup function ---
    // This runs when the component unmounts
    return () => {
      // Stop listening to the event to prevent memory leaks
      socket.off('taskUpdated', handleTaskUpdate);
    };
  }, [projectId]); // Re-run effect if projectId changes

  useEffect(() => {
    fetchProjectData();
  }, [projectId]);

  const openEditModal = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  if (!project) return <div>Loading...</div>;

  // Filter tasks into columns
  const todoTasks = tasks.filter(t => t.status === 'ToDo');
  const inProgressTasks = tasks.filter(t => t.status === 'InProgress');
  const doneTasks = tasks.filter(t => t.status === 'Done');

  return (
    <div>
      <Link to="/dashboard">← Back to Dashboard</Link>
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      <button onClick={openAddModal}>+ Add Task</button>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <TaskColumn title="To Do" tasks={todoTasks} onEditTask={openEditModal} />
        <TaskColumn title="In Progress" tasks={inProgressTasks} onEditTask={openEditModal} />
        <TaskColumn title="Done" tasks={doneTasks} onEditTask={openEditModal} />
      </div>

      <TaskModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTaskSaved={fetchProjectData}
        projectId={projectId}
        taskToEdit={taskToEdit}
      />
    </div>
  );
};

export default ProjectPage;