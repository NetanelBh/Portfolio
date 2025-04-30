import axios from 'axios';

const getMoviesFromWeb = (url) => { 
    return axios.get(url);
};

export default getMoviesFromWeb;