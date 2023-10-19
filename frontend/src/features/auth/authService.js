import axios from 'axios';

const API_URL = '/api/users/';

//Register Function
const register = async (userData) => {
  const res = await axios.post(API_URL, userData);
  if (res.data) {
    localStorage.setItem('user', JSON.stringify(res.data));
  }
  return res.data;
};

//Login Function
const login = async (userData) => {
  const res = await axios.post(API_URL + 'login', userData);
  if (res.data) {
    localStorage.setItem('user', JSON.stringify(res.data));
  }
  return res.data;
};

//logout Function
const logout = () => {
  localStorage.removeItem('user');
};

const authService = { register, login, logout };
export default authService;
