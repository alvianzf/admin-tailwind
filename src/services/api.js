import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export class API {
  static login(payload) {
    return apiClient.post('/auth', payload);
  }

  static bookData() {
    return apiClient.get('/booking-data');
  }

  static issueTicket(payload) {
    return apiClient.post('/payment', payload)
  }

  static getUsers() {
    return apiClient.get('/users')
  }

  static registerUser(payload) {
    return apiClient.post('/users/register', payload)
  }

  static updateUser(id, payload) {
    return apiClient.put(`/users/${id}`, payload)
  }

  static deleteUser(id) {
    return apiClient.delete(`/users/${id}`)
  }
}

export default API;
