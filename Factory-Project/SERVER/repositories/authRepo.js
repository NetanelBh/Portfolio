import axios from 'axios';

export const getUserFromWeb = (user) => {
  const url = `https://jsonplaceholder.typicode.com/users?username=${user}`;
  
  return axios.get(url);
};

export const getAllUsersFromWeb = () => {
  const url = 'https://jsonplaceholder.typicode.com/users';
  
  return axios.get(url);
};