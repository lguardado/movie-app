export function getPrefixUrl(state) {
  return state.movies.prefixUrl;
}

export function getMovies(state) {
  return state.movies.data;
}

export function getGenresNames(state, ids) {
  return ids.map(id => {
    const foundGenre = state.movies.genres.find(genre => genre.id === id);
    return foundGenre ? foundGenre.name : null;
  });
}

export function getPage(state) {
  return state.movies.page;
}
