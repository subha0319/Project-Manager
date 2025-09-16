import api from './api';

// Fetches ALL projects for the logged-in user (for the dashboard)
export const getProjects = async () => {
  // This should be a simple GET request to '/projects' with no ID
  const response = await api.get('/projects');
  return response.data;
};

// Fetches a SINGLE project by its unique ID (for the project details page)
export const getProjectById = async (projectId) => {
  const response = await api.get(`/projects/${projectId}`);
  return response.data;
};

// Creates a new project
export const createProject = async (projectData) => {
  const response = await api.post('/projects', projectData);
  return response.data;
};

export const addMemberToProject = async (projectId, email) => {
  const response = await api.post(`/projects/${projectId}/members`, { email });
  return response.data;
};

// Function to delete a project
export const deleteProject = async (projectId) => {
  const response = await api.delete(`/projects/${projectId}`);
  return response.data;
};