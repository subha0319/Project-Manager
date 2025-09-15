import api from './api'; // Import our centralized api instance

// Function to get all projects for the logged-in user
export const getProjects = async (projectId) => {
  const response = await api.get(`/projects/${projectId}`);
  return response.data;
};

// Function to create a new project
export const createProject = async (projectData) => {
  const response = await api.post('/projects', projectData);
  return response.data;
};

// Function to get a single project by its ID
export const getProjectById = async (projectId) => {
  const response = await api.get(`/projects/${projectId}`);
  return response.data;
};