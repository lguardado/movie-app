import { useEffect, useState, useCallback } from 'react';
import { fetchConfiguration } from 'controllers/MoviesClient';

/**
 * This hook gets from the API configuration the prefix used for
 * accessing the image.
 */
const useFetchPrefixUrl = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [prefixUrl, setPrefixUrl] = useState('');
  const small = 1;

  const fetchCfg = useCallback(async () => {
    setIsFetching(true);
    const response = await fetchConfiguration();
    // we are currently using the first postersize from the configuration.
    // This hook could be improved to receive the size we want to use and
    // a default size.
    setIsFetching(false);
    setPrefixUrl(
      response.images.base_url + response.images.backdrop_sizes[small]
    );
  }, []);

  useEffect(() => {
    fetchCfg();
  }, [fetchCfg]);

  return [isFetching, prefixUrl];
};

export default useFetchPrefixUrl;
