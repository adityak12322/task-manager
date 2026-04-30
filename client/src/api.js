import axios from 'axios';

const API = axios.create({ baseURL: 'task-manager-production-33e6.up.railway.app' });

// Token automatically har request mein bhejne ke liye
API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers['x-auth-token'] = localStorage.getItem('token');
  }
  return req;
});

export const fetchTasks = () => API.get('/tasks');
export const createTask = (newTask) => API.post('/tasks', newTask);
export const loginUser = (formData) => API.post('/auth/register', formData); // Ya login route