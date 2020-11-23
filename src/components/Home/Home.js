import React, { useEffect, useState } from 'react';
import { View, Image, FlatList } from 'react-native';
import useFetchMovies from '../../hooks/useFetchMovies';
import Center from '../Center';
import { getConfiguration } from '../../helpers/MoviesHelper';

import logoIcon from 'assets/ic_logo/ic_logo.png';
import styles from 'components/Home/styles';
import MoviesListItem from 'components/MoviesListItem';

function Home() {
  const [urlPrefix, setUrlPrefix] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [movies, fetchMore] = useFetchMovies();

  useEffect(() => {
    setIsLoading(true);
    const fetchCfg = async () => {
      const response = await getConfiguration();
      setUrlPrefix(
        response.images.base_url + response.images.backdrop_sizes[1]
      );
    };
    fetchCfg();
    setIsLoading(false);
  }, []);

  return (
    <View style={styles.container}>
      <Center>
        <Image source={logoIcon} style={styles.logoIcon} />
      </Center>
      {!isLoading && (
        <FlatList
          style={styles.flatList}
          data={movies}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <MoviesListItem uri={urlPrefix + item.poster_path} />
          )}
          onEndReached={fetchMore}
          onEndReachedThreshold={0.9}
        />
      )}
    </View>
  );
}

export default Home;
