import axios from 'axios';

const baseURL = 'https://pokekeeper.onrender.com'; // Your deployed backend URL

const api = axios.create({
  baseURL,
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Ensure the token is being set correctly
  },
});

export default api;
