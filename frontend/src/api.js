import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api', // Update port if different
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;