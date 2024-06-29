import axios from 'axios';

export const instants = axios.create({
    baseURL: 'http://localhost:3090/api/',
});

export const apiAi = axios.create({
    baseURL: 'https://664f60e2ec9b4a4a602e9192.mockapi.io',
});
