import axios from 'axios';
import { SERVER_URL, ACCESS_TOKEN } from "../constants"

const apiClient = axios.create({
  baseURL: `${SERVER_URL}/api`,
  // headers: {
  //   "Content-type": "application/json"
  // }
})

apiClient.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
  }
  return request;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if the response status is 401 (Unauthorized)
    if (error.response && error.response.status === 401 && error.response.data?.message === 'Unauthorised') {
      localStorage.removeItem(ACCESS_TOKEN);
      return window.location = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient
