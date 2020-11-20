import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, View, Image, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import Center from '../Center';
import { fetchMovies, getConfiguration } from '../../helpers/MoviesHelper';

import logoIcon from 'assets/ic_logo/ic_logo.png';
import styles from 'components/Home/styles';
import strings from 'localization';
import { getUser } from 'selectors/UserSelectors';

function Home() {
  const { colors } = useTheme();
  const user = useSelector(getUser);
  const [movies, setMovies] = useState([]);
  const [urlPrefix, setUrlPrefix] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    let response;
    const fetch = async () => {
      response = await fetchMovies();
      setMovies(response.results);
    };
    fetch();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    let response;
    const fetchCfg = async () => {
      response = await getConfiguration();
      setUrlPrefix(
        response.images.base_url + response.images.backdrop_sizes[3]
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
        style={{ height: 200 }}
        resizeMode="cover"
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Center>
        <Image source={logoIcon} style={styles.logoIcon}/>
      </Center>
      {!isLoading && (
        <FlatList
          style={styles.flatList}
          data={movies}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

export default Home;
