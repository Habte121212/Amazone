import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:5001/e-clone-a50da/us-central1/server',
})

export {axiosInstance as axios}