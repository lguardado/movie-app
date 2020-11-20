import { useEffect, useState, useCallback } from 'react';
import { fetchMovies } from '../helpers/MoviesHelper';

const useFetchMovies = () => {
  const [page, setPage] = useState(1);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [movies, setMovies] = useState([]);

  const fetchMore = useCallback(() => setShouldFetch(true), []);

  useEffect(() => {
    if (!shouldFetch) {
      return;
    }

    const fetch = async () => {
      const res = await fetchMovies(page);
      const newMovies = res.results;
      setShouldFetch(false);
      setMovies(prevMovies => [...prevMovies, ...newMovies]);
      setPage(page + 1);
    };

    fetch();
  }, [page, shouldFetch]);

  return [movies, fetchMore];
};

export default useFetchMovies;
