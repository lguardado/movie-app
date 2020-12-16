import Config from 'react-native-config';
import axios from 'helpers/Axios';

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

async function getWithQuery(url, query = '') {
  try {
    const response = await axios.get(
      `${url}?api_key=${API_KEY}&query=${query}`
    );
    if (response.data) {
      return response.data.results;
    }
    throw response.data.results;
  } catch (err) {
    throw new Error(err.message);
  }
}

export const fetchMovies = async (page = 1) => {
  return getPaginated('/movie/popular', page).catch(err => {
    throw new Error(err.message);
  });
};

export const fetchGenres = async () => {
  return get('/genre/movie/list').catch(err => {
    throw new Error(err.message);
  });
};

export const fetchConfiguration = async () => {
  return get('/configuration').catch(err => {
    throw new Error(err.message);
  });
};

export const searchMovie = async query => {
  return getWithQuery('/search/movie', query).catch(err => {
    throw new Error(err.message);
  });
};
