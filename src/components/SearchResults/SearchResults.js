import React, { useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { useTheme } from '@react-navigation/native';
import getStyles from './styles';
import MoviesListItem from 'components/MoviesListItem';
import { getPrefixUrl } from 'selectors/MoviesSelectors';
import { fetchPrefix } from 'actions/MoviesActions';
import navigationConstants from 'constants/navigation';
import strings from 'localization';
import Center from 'components/Center';

const SearchResults = ({ movies, isLoading, navigation }) => {
  const styles = getStyles(useTheme());
  const dispatch = useDispatch();
  const prefixUrl = useSelector(state => getPrefixUrl(state));

  useEffect(() => {
    dispatch(fetchPrefix());
  }, [dispatch]);

  const handleMoviePress = currentItem => {
    navigation.push(navigationConstants.details, {
      movie: currentItem,
    });
  };

  const renderItem = ({ item }) => {
    const {
      id,
      poster_path: path,
      title,
      original_title: originalTitle,
    } = item;
    return (
      <MoviesListItem
        testID="results-item"
        id={id}
        title={title || originalTitle}
        uri={prefixUrl + path}
        handleMoviePress={() => handleMoviePress(item)}
      />
    );
  };
  return movies && movies.length ? (
    <View style={{ paddingBottom: 50 }}>
      <FlatList
        testID="movies-search-results"
        data={movies}
        keyExtractor={item => item.id.toString()}
        refreshing={isLoading}
        renderItem={renderItem}
      />
    </View>
  ) : (
    <Center>
      <Text testID="no-movies-found" style={styles.text}>
        {strings.noMoviesFound}
      </Text>
    </Center>
  );
};

export default SearchResults;

SearchResults.propTypes = {
  movies: PropTypes.array,
  isLoading: PropTypes.bool,
  navigation: PropTypes.object,
};

SearchResults.defaultProps = {
  movies: [],
  isLoading: false,
  navigation: {},
};
