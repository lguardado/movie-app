import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import Center from '../Center';
import { fetchMovies, getConfiguration } from '../../helpers/MoviesHelper';

import logoIcon from 'assets/ic_logo/ic_logo.png';
import styles from 'components/Home/styles';
import TextStyles from 'helpers/TextStyles';
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
      setMovies(response);
    };
    const fetchCfg = async () => {
      response = await getConfiguration();
      setUrlPrefix(
        response.images.base_url + response.images.backdrop_sizes[3]
      );
    };
    fetch();
    fetchCfg();
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

  const mainPosterUri = movies.results
    ? urlPrefix + movies.results[0].poster_path
    : '';

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={{ uri: mainPosterUri }} style={styles.backgroundImage} />
        <Center>
          <Image source={logoIcon} />
        </Center>
        {/* <Text>{movies['poster_path']}</Text> */}
        <Text style={[TextStyles.lightTitle, { color: colors.text }]}>
          {isLoading && <Text>Loading...</Text>}
          {!isLoading && JSON.stringify(movies, null, 5)}
        </Text>
      </ScrollView>

      <Text style={{ color: colors.text }}>
        {strings.homeMessage} {user?.name}
      </Text>
    </View>
  );
}

export default Home;
