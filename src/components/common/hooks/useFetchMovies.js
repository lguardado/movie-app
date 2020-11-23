import { useEffect, useState, useCallback } from 'react';
import { fetchMovies } from 'controllers/MoviesClient';

const useFetchMovies = () => {
  const [page, setPage] = useState(1);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [movies, setMovies] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchMore = useCallback(() => setShouldFetch(true), []);
  const fetchConfig = useCallback(async () => {
    if (!shouldFetch) {
      return;
    }
    setIsFetching(true);
    const res = await fetchMovies(page);
    const newMovies = res.results;
    setShouldFetch(false);
    setMovies(prevMovies => [...new Set([...prevMovies, ...newMovies])]);
    setPage(page + 1);
    setIsFetching(false);
  }, [page, shouldFetch]);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  return [movies, fetchMore, isFetching];
};

export default useFetchMovies;
