// src/services/api.ts
import axios from 'axios';
import Constants from 'expo-constants';

// Obtenemos la URL base desde app.config.js -> extra.API_URL
const BASE_URL = Constants.expoConfig?.extra?.API_URL;

console.log('📡 BASE_URL usada por Axios:', BASE_URL);

if (!BASE_URL) {
  console.warn('⚠️ API_URL no definida en Constants.extra.API_URL');
}

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor opcional para logs o auth tokens futuros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('❌ Error en API:', error?.response?.status || error.message);
    return Promise.reject(error);
  }
);

export default api;
