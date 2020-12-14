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
  let tokenSource;
  try {
    if (typeof tokenSource !== typeof undefined) {
      tokenSource.cancel('Operation canceled due to a new request');
    }
    tokenSource = axios.CancelToken.source();

    const response = await axios.get(
      `${url}?api_key=${API_KEY}&query=${query}`,
      {
        cancelToken: tokenSource.token,
      }
    );
    if (response.data) {
      return { cancelPrevQuery: false, result: response.data.results };
    }
    throw response;
  } catch (err) {
    if (axios.isCancel(err)) {
      return { cancelPrevQuery: true };
    }
    return { error: err };
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
