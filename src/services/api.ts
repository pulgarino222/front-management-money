import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const API_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
});

// Modified interceptor to avoid zustand store serialization issues
api.interceptors.request.use((config) => {
  const state = useAuthStore.getState();
  if (state.token) {
    config.headers.Authorization = `Bearer ${state.token}`;
  }
  return config;
});

export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/signin', { email, password });
    return response.data;
  },
  register: async (userData: any) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
};

export const financeService = {
  getIncomes: async () => {
    const response = await api.get('/income');
    return response.data;
  },
  createIncome: async (data: any) => {
    const response = await api.post('/income', data);
    return response.data;
  },
  
  getExpenses: async () => {
    const response = await api.get('/expense/user');
    return response.data;
  },
  createExpense: async (data: any) => {
    const response = await api.post('/expense', data);
    return response.data;
  },
  
  createBudget: async (data: any) => {
    const response = await api.post('/budget', data);
    return response.data;
  },
  updateBudget: async (id: string, data: any) => {
    const response = await api.put(`/budget/${id}`, data);
    return response.data;
  },
};

export default api;