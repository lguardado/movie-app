import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import {
  View,
  Keyboard,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '@react-navigation/native';

import getStyles from './styles';
import useDebounce from 'components/common/hooks/useDebounce';
import ErrorView from 'components/common/ErrorView';
import SearchResults from 'components/SearchResults';
import TextField from 'components/common/TextField';
import searchIcon from 'assets/ic_search/ic_search.png';
import Center from 'components/Center';

import strings from 'localization';
import { searchMovie } from 'controllers/MoviesClient';

const Search = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const styles = getStyles(useTheme());

  const handleChangeText = value => {
    setIsLoading(true);
    setSearchTerm(value);
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsLoading(true);
      searchMovie(debouncedSearchTerm)
        .then(results => {
          setIsLoading(false);
          setMovies(results);
        })
        .catch(err => setErrorMsg(err.message));
    } else {
      setIsLoading(false);
      setMovies([]);
    }
  }, [debouncedSearchTerm]);

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
      {searchTerm !== '' && !isLoading && (
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
