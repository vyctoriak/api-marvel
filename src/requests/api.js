import axios from 'axios';

const api = axios.create({
  baseURL: "developer.marvel.com/v1"
});

export default api;