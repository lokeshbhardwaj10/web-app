import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
};

export const projectService = {
  getProjects: () => api.get('/projects'),
  getProject: (id) => api.get(`/projects/${id}`),
  createProject: (data) => api.post('/projects', data),
  updateProject: (id, data) => api.put(`/projects/${id}`, data),
  deleteProject: (id) => api.delete(`/projects/${id}`),
};

export const teamService = {
  getTeamMembers: (projectId) => api.get(`/projects/${projectId}/team`),
  addTeamMember: (projectId, data) => api.post(`/projects/${projectId}/team`, data),
  removeTeamMember: (projectId, memberId) => api.delete(`/projects/${projectId}/team/${memberId}`),
};

export const taskService = {
  getTasks: (projectId, filters) => api.get(`/projects/${projectId}/tasks`, { params: filters }),
  getTask: (projectId, taskId) => api.get(`/projects/${projectId}/tasks/${taskId}`),
  createTask: (projectId, data) => api.post(`/projects/${projectId}/tasks`, data),
  updateTask: (projectId, taskId, data) => api.put(`/projects/${projectId}/tasks/${taskId}`, data),
  deleteTask: (projectId, taskId) => api.delete(`/projects/${projectId}/tasks/${taskId}`),
};

export const dashboardService = {
  getDashboard: () => api.get('/dashboard'),
};

export default api;
