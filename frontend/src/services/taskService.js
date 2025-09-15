import api from './api';

// Get all tasks for a specific project
export const getTasksForProject = async (projectId) => {
  const response = await api.get(`/tasks/project/${projectId}`);
  return response.data;
};

// Create a new task
export const createTask = async (taskData) => {
  const response = await api.post('/tasks', taskData);
  return response.data;
};

// Update an existing task
export const updateTask = async (taskId, taskData) => {
  const response = await api.put(`/tasks/${taskId}`, taskData);
  return response.data;
};

// Get all tasks for the logged-in user across all their projects
export const getMyTasks = async () => {
  const response = await api.get('/tasks/mytasks');
  return response.data;
};