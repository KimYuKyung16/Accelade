import axios from 'axios';

const BASE_URL = 'http://13.124.223.21:8000/';

const defaultApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
});

export const defaultInstance = defaultApi;
