import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Cambiar según tu configuración
});

export default api;
