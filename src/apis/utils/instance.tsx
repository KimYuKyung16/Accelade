import axios from 'axios';

const BASE_URL = 'http://13.124.223.21:8000/';

const defaultApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
});

const fileApi = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'multipart/form-data; charset: UTF-8;' },
});

fileApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const defaultInstance = defaultApi;
export const fileInstance = fileApi;
