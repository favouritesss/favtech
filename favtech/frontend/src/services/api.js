import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// ─────────────────────────────────────────────
//  SESSION KEY CONSTANTS  (single source of truth)
// ─────────────────────────────────────────────
export const SESSION_KEYS = {
  USER_TOKEN: 'favtech_user_token',
  USER_DATA:  'favtech_user_data',
  ADMIN_TOKEN: 'favtech_admin_token',
  ADMIN_DATA:  'favtech_admin_data',
};

// ─────────────────────────────────────────────
//  USER API CLIENT  (reads favtech_user_token)
// ─────────────────────────────────────────────
const userApi = axios.create({ baseURL: BASE_URL });

userApi.interceptors.request.use((config) => {
  const token = localStorage.getItem(SESSION_KEYS.USER_TOKEN);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ─────────────────────────────────────────────
//  ADMIN API CLIENT  (reads favtech_admin_token)
// ─────────────────────────────────────────────
const adminApi = axios.create({ baseURL: BASE_URL });

adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem(SESSION_KEYS.ADMIN_TOKEN);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ─────────────────────────────────────────────
//  AUTH SERVICE  (login + register — no token needed)
// ─────────────────────────────────────────────
export const authService = {
  login:    (data) => axios.post(`${BASE_URL}/auth/login`, data),
  register: (data) => axios.post(`${BASE_URL}/auth/register`, data),
};

// ─────────────────────────────────────────────
//  ADMIN SERVICE  (uses adminApi → admin token)
// ─────────────────────────────────────────────
export const adminService = {
  getStats:       ()          => adminApi.get('/admin/stats'),
  getUsers:       ()          => adminApi.get('/admin/users'),
  updateUser:     (id, data)  => adminApi.put(`/admin/users/${id}`, data),
  getOrders:      ()          => adminApi.get('/admin/orders'),
  getSettings:    ()          => adminApi.get('/admin/settings'),
  updateSettings: (data)      => adminApi.post('/admin/settings', data),
  uploadLogo:     (formData)  => adminApi.post('/admin/upload-logo', formData, {
                                   headers: { 'Content-Type': 'multipart/form-data' },
                                 }),
  testEmail:      (data)      => adminApi.post('/admin/test-email', data),
  getChartData:   (period)    => adminApi.get(`/admin/chart-data?period=${period}`),
};

// ─────────────────────────────────────────────
//  PUBLIC SERVICE  (no auth required)
// ─────────────────────────────────────────────
export const publicService = {
  getSettings: () => axios.get(`${BASE_URL}/settings/public`),
};

// ─────────────────────────────────────────────
//  USER SERVICE  (uses userApi → user token)
// ─────────────────────────────────────────────
export const userService = {
  getProfile:        ()      => userApi.get('/user/profile'),
  getOrders:         ()      => userApi.get('/user/orders'),
  getStats:          ()      => userApi.get('/user/stats'),
  getTransactions:   ()      => userApi.get('/user/transactions'),
  getTickets:        ()      => userApi.get('/user/tickets'),
  createTicket:      (data)  => userApi.post('/user/tickets', data),
  getServices:       ()      => userApi.get('/services'),
  newOrder:          (data)  => userApi.post('/orders/new', data),
  fundWallet:        (data)  => userApi.post('/wallet/fund', data),
};

export default userApi;
