import React, { useEffect, useState } from 'react';
import { View, Image, FlatList, ActivityIndicator } from 'react-native';
import useFetchMovies from 'components/common/hooks/useFetchMovies';
import Center from 'components/Center';
import { getConfiguration } from 'controllers/MoviesClient';

import logoIcon from 'assets/ic_logo/ic_logo.png';
import styles from 'components/Home/styles';
import MoviesListItem from 'components/MoviesListItem';

function Home() {
  const [urlPrefix, setUrlPrefix] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [movies, fetchMore, isFetchingMovies] = useFetchMovies();

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

  return (
    <>
      {isLoading && (
        <Center style={styles.loading}>
          <ActivityIndicator size="large" />
        </Center>
      )}
      <View style={styles.container}>
        <Center>
          <Image source={logoIcon} style={styles.logoIcon} />
        </Center>
        {!isLoading && (
          <FlatList
            style={styles.flatList}
            data={movies}
            keyExtractor={item => item.id.toString()}
            refreshing={isFetchingMovies}
            renderItem={({ item }) => (
              <MoviesListItem uri={urlPrefix + item.poster_path} />
            )}
            onEndReached={fetchMore}
            onEndReachedThreshold={0.9}
          />
        )}
      </View>
    </>
  );
}

export default Home;
