export function getPrefixUrl(state) {
  return state.movies.prefixUrl;
}

export function getMovies(state) {
  return state.movies.data;
}

export function getGenres(state) {
  return state.movies.genres;
}

export function getPage(state) {
  return state.movies.page;
}
