import Config from 'react-native-config';
import axios from './Axios';

// todo move this to env variables when fixed issue reading process.env
const { API_KEY } = Config;

async function get(url) {
  try {
    const response = await axios.get(`${url}?api_key=${API_KEY}`);
    if (response.data) {
      return response.data;
    }
    throw response;
  } catch (err) {
    throw new Error(err.message);
  }
}

async function getPaginated(url, page = '') {
  try {
    const response = await axios.get(`${url}?api_key=${API_KEY}&page=${page}`);
    if (response.data) {
      return response.data;
    }
    throw response;
  } catch (err) {
    throw new Error(err.message);
  }
}

export const fetchMovies = async () => {
  const page = 1;
  return getPaginated('/movie/popular', page);
};

export const getConfiguration = async () => {
  return get('/configuration');
};
