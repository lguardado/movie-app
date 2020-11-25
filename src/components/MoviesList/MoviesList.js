import React from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';
import { PropTypes } from 'prop-types';
import MoviesListItem from 'components/MoviesListItem';
import styles from 'components/MoviesList/styles';

const MoviesList = ({ movies, urlPrefix, isFetchingMovies, fetchMore }) => {
  const renderFooter = () => <ActivityIndicator size="large" />;

  const renderItem = ({ item }) => (
    <MoviesListItem uri={urlPrefix + item.poster_path} />
  );
  return (
    movies.length && (
      <View>
        <FlatList
          testID="moviesflatList"
          style={styles.flatList}
          data={movies}
          keyExtractor={item => item.id.toString()}
          refreshing={isFetchingMovies}
          ListFooterComponent={renderFooter}
          renderItem={renderItem}
          onEndReached={fetchMore}
          onEndReachedThreshold={0.9}
        />
      </View>
    )
  );
};

export default MoviesList;

MoviesList.propTypes = {
  urlPrefix: PropTypes.string,
  movies: PropTypes.array,
  isFetchingMovies: PropTypes.bool,
  fetchMore: PropTypes.func,
};

MoviesList.defaultProps = {
  urlPrefix: '',
  movies: [],
  isFetchingMovies: false,
  fetchMore: () => {},
};
