import React, { useEffect, useState } from 'react';
import { View, Image, Text, ActivityIndicator } from 'react-native';
import useFetchMovies from 'components/common/hooks/useFetchMovies';
import Center from 'components/Center';
import { getConfiguration } from 'controllers/MoviesClient';
import strings from 'localization';
import logoIcon from 'assets/ic_logo/ic_logo.png';
import styles from 'components/Home/styles';
import MoviesList from 'components/MoviesList';

function Home() {
  const [urlPrefix, setUrlPrefix] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    movies,
    fetchMore,
    isFetchingMovies,
    errorFetchingMovies,
  } = useFetchMovies();

  useEffect(() => {
    setIsLoading(true);
    const fetchCfg = async () => {
      const response = await getConfiguration();
      setUrlPrefix(
        response.images.base_url + response.images.backdrop_sizes[1]
      );
      setIsLoading(false);
    };
    fetchCfg();
  }, []);

  return !errorFetchingMovies ? (
    <>
      {(isLoading || isFetchingMovies) && (
        <Center testID="loading" style={styles.loading}>
          <ActivityIndicator size="large" />
        </Center>
      )}
      <View testID="moviesContainer" style={styles.container}>
        <Center>
          <Image source={logoIcon} style={styles.logoIcon} />
        </Center>
        {!isLoading && (
          <MoviesList
            movies={movies}
            urlPrefix={urlPrefix}
            isFetchingMovies={isFetchingMovies}
            fetchMore={fetchMore}
          />
        )}
      </View>
    </>
  ) : (
    <View testID="error" style={styles.error}>
      <Text style={styles.errorText}>{strings.errorFetching}</Text>
      <Text style={styles.errorText}>{errorFetchingMovies}</Text>
    </View>
  );
}
export default Home;
