import axios from 'axios';

export const makeRequest = axios.create({
    baseURL: "http://localhost:3002",
    withCredentials: true,
})