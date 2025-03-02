import { setToken } from '@/app/features/userSlice';
import axios from 'axios'

const isDevelopment = import.meta.env.MODE === 'development'
let baseURL = import.meta.env.VITE_SERVER_URL

if (!isDevelopment) {
  // Update this later when you have a working backend server
  baseURL = import.meta.env.VITE_SERVER_URL
}

const api = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
})

api.interceptors.request.use(
  (config) => {
    const token =  localStorage.getItem("loginData") ? JSON.parse(localStorage.getItem("loginData") as string).token : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("loginData") ? JSON.parse(localStorage.getItem("loginData") as string).userData.refreshToken : null;
        const response = await axios.post('/api/refresh', { refreshToken });
        const { token } = response.data;

        setToken(token)

        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (error) {
          throw new Error("error")
      }
    }
    return Promise.reject(error);
  }
);

export default api