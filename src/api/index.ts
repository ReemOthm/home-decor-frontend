import axios from 'axios'

const isDevelopment = import.meta.env.MODE === 'development'
let baseURL = 'https://home-decor-backend-service.onrender.com'

if (!isDevelopment) {
  // Update this later when you have a working backend server
  baseURL = 'https://home-decor-backend-service.onrender.com'
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
    const token = localStorage.getItem('token');
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
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post('/api/refresh', { refreshToken });
        const { token } = response.data;

        localStorage.setItem('token', token);

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
