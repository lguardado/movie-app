import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import _ from 'lodash';
import {
  View,
  Keyboard,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '@react-navigation/native';

import getStyles from './styles';
import ErrorView from 'components/common/ErrorView';
import SearchResults from 'components/SearchResults';
import TextField from 'components/common/TextField';
import searchIcon from 'assets/ic_search/ic_search.png';
import Center from 'components/Center';

import strings from 'localization';
import { searchMovie } from 'controllers/MoviesClient';

const Search = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState({});
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [query, setQuery] = useState('');
  const styles = getStyles(useTheme());

  const performQuery = async value => {
    if (!value.length) {
      setMovies([]);
      setIsLoading(false);
      return;
    }
    const res = await searchMovie(value);
    const { cancelPrevQuery, result, error } = res;
    if (cancelPrevQuery) return;

    if (res && !error) {
      setMovies(result);
      setErrorMsg('');
    } else {
      setMovies([]);
      setErrorMsg(error.message || strings.errorFetching);
    }
    setIsLoading(false);
  };

  const handleChangeText = value => {
    setIsLoading(true);
    setQuery(value);
    const delay = value.length ? 500 : 0;
    const search = _.debounce(async term => performQuery(term), delay);
    setSearchQuery(prevSearch => {
      if (prevSearch.cancel) {
        prevSearch.cancel();
      }
      return search;
    });
    search(value);
  };

  return (
    <Pressable
      style={styles.pressable}
      onPress={() => Keyboard.dismiss()}
      testID="search-view"
    >
      <ErrorView errors={[errorMsg]} />
      <View style={styles.container}>
        <Image source={searchIcon} style={styles.icon} />
        <TextField
          testID="text-input"
          placeholder={strings.searchPlaceholder}
          autoFocus
          onChangeText={handleChangeText}
          style={styles.input}
          clearButtonMode="while-editing"
        />
      </View>
      {isLoading && (
        <Center>
          <ActivityIndicator />
        </Center>
      )}
      {query !== '' && !isLoading && (
        <SearchResults
          navigation={navigation}
          movies={movies}
          isLoading={isLoading}
        />
      )}
    </Pressable>
  );
};

export default Search;

Search.propTypes = {
  navigation: PropTypes.object,
};

Search.defaultProps = {
  navigation: {},
};
