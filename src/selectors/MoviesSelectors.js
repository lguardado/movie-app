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

export function getFavourites(state) {
  return state.movies.favourites;
}

export function isFavourite(state, id) {
  return state.movies.favourites && state.movies.favourites.length
    ? state.movies.favourites.includes(id)
    : false;
}
