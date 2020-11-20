import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Image, FlatList } from 'react-native';
import useFetchMovies from '../../hooks/useFetchMovies';
import Center from '../Center';
import { getConfiguration } from '../../helpers/MoviesHelper';

import logoIcon from 'assets/ic_logo/ic_logo.png';
import styles from 'components/Home/styles';

function Home() {
  const { colors } = useTheme();
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

  const renderItem = ({ item }) => {
    const uri = urlPrefix + item.poster_path;
    return (
      <Image
        source={{
          uri,
        }}
        style={styles.movieCard}
        resizeMode="cover"
      />
    );
  };

  return (
    <View>
      <Center>
        <Image source={logoIcon} style={styles.logoIcon} />
      </Center>
      {!isLoading && (
        <FlatList
          style={styles.flatList}
          data={movies}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          onEndReached={fetchMore}
          onEndReachedThreshold={0.9}
        />
      )}
    </View>
  );
}

export default Home;
