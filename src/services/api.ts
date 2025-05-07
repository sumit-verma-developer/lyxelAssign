import axios from 'axios';
import { getToken } from '../storage/storage';

const API = axios.create({
  baseURL: 'https://coffee-island.lyxelandflamingotech.in/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token && config.url !== 'login' && config.url !== 'otp-verify') {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
