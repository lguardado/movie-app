import { useEffect, useState, useCallback } from 'react';
import { fetchMovies } from 'controllers/MoviesClient';

const useFetchMovies = () => {
  const [page, setPage] = useState(1);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [movies, setMovies] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchMore = useCallback(() => setShouldFetch(true), []);

  useEffect(() => {
    if (!shouldFetch) {
      return;
    }

    const fetch = async () => {
      setIsFetching(true);
      const res = await fetchMovies(page);
      const newMovies = res.results;
      setShouldFetch(false);
      setMovies(prevMovies => [...prevMovies, ...newMovies]);
      setPage(page + 1);
      setIsFetching(false);
    };

    fetch();
  }, [page, shouldFetch]);

  return [movies, fetchMore, isFetching];
};

export default useFetchMovies;
