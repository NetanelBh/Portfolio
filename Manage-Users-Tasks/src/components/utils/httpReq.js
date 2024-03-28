import axios from 'axios';

const httpRequest = (url) => {
  try {
    return axios.get(url);
  } catch (error) {
    throw new Error(error.message);
  }
};

export default httpRequest;