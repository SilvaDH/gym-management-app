// // Frontend: features/user/userApi.js
// import axios from 'axios';

// const API_URL = 'http://localhost:8000/api_v1/users';

// export const fetchUsers = async () => {
//   try {
//     const response = await axios.get(API_URL);
//     return response.data;
//   } catch (error) {
//     throw error.response ? error.response.data : new Error('Network Error');
//   }
// };

// export const registerUser = async (userData) => {
//   try {
//     const response = await axios.post(`${API_URL}/register`, userData);
//     return response.data;
//   } catch (error) {
//     throw error.response ? error.response.data : new Error('Network Error');
//   }
// };