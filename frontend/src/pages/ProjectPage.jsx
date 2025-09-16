import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth to get current user
import * as projectService from '../services/projectService';
import * as taskService from '../services/taskService';
import TaskColumn from '../components/TaskColumn';
import TaskModal from '../components/TaskModal';
import socket from '../services/socketService';

const ProjectPage = () => {
  const { projectId } = useParams();
  const { user } = useAuth(); // Get the currently logged-in user
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [inviteEmail, setInviteEmail] = useState(''); // State for the invite form

  // This function can be called to refresh all data for the page
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

  // Combined useEffect for data fetching and socket connection
  useEffect(() => {
    fetchProjectData();

    socket.emit('joinProject', projectId);

    const handleTaskUpdate = (updatedTask) => {
      setTasks(currentTasks => 
        currentTasks.map(task => 
          task._id === updatedTask._id ? updatedTask : task
        )
      );
    };
    
    socket.on('taskUpdated', handleTaskUpdate);

    return () => {
      socket.off('taskUpdated', handleTaskUpdate);
    };
  }, [projectId]);

  // Function to handle inviting a new member
  const handleInviteMember = async (e) => {
    e.preventDefault();
    if (!inviteEmail) return;
    try {
      await projectService.addMemberToProject(projectId, inviteEmail);
      alert('Member added successfully!');
      setInviteEmail('');
      fetchProjectData(); // Refresh data to show the new member in the list
    } catch (error) {
      console.error('Failed to add member:', error);
      alert(error.response?.data?.message || 'An error occurred while adding the member.');
    }
  };

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

      {/* --- Members Section --- */}
      <div style={{ marginTop: '40px', borderTop: '1px solid #ccc', paddingTop: '20px' }}>
        <h3>Members</h3>
        <ul>
          {project.owner && <li>{project.owner.name} ({project.owner.email}) - <b>Owner</b></li>}
          {project.members && project.members.map(member => (
            <li key={member._id}>{member.name} ({member.email})</li>
          ))}
        </ul>

        {/* Conditionally render the invite form only for the project owner */}
        {user && project.owner && user._id === project.owner._id && (
          <form onSubmit={handleInviteMember} style={{ marginTop: '10px' }}>
            <input 
              type="email" 
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="Invite user by email"
              required
            />
            <button type="submit">Invite Member</button>
          </form>
        )}
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