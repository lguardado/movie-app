import { useEffect, useState, useCallback } from 'react';
import { fetchMovies } from 'controllers/MoviesClient';

const useFetchMovies = () => {
  const [page, setPage] = useState(1);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [movies, setMovies] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  const fetchMore = useCallback(() => setShouldFetch(true), []);
  const fetchConfig = useCallback(async () => {
    if (!shouldFetch) {
      return;
    }
    setIsFetching(true);
    const res = await fetchMovies(page).catch(err => {
      setError(err);
      setIsFetching(false);
    });
    const newMovies = res.results;
    setShouldFetch(false);
    setMovies(prevMovies => {
      const newArray = [...prevMovies];
      // Verifying the items in the new array are not existing before ading them
      newMovies.forEach(element => {
        if (!prevMovies.includes(el => el.id === element.id)) {
          newArray.push(element);
        }
      });
      return newArray;
    });
    setPage(page + 1);
    setIsFetching(false);
  }, [page, shouldFetch]);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  return { movies, fetchMore, isFetching, error };
};

export default useFetchMovies;
