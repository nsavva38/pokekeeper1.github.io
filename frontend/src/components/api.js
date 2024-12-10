import axios from 'axios';

const baseURL = 'https://pokekeeper.onrender.com'; // Your deployed backend URL

const api = axios.create({
  baseURL,
});

export default api;
