import React from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';
import { PropTypes } from 'prop-types';
import MoviesListItem from 'components/MoviesListItem';
import styles from 'components/MoviesList/styles';

const MoviesList = ({
  movies,
  urlPrefix,
  isFetchingMovies,
  fetchMore,
  handleMoviePress,
}) => {
  const renderFooter = () => <ActivityIndicator size="large" />;

  const renderItem = ({ item }) => {
    const { id, poster_path: path } = item;
    return (
      <MoviesListItem
        id={id}
        uri={urlPrefix + path}
        handleMoviePress={() => handleMoviePress(item)}
      />
    );
  };
  return movies && movies.length ? (
    <View>
      <FlatList
        testID="movies-flatlist"
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
  ) : null;
};

export default MoviesList;

MoviesList.propTypes = {
  urlPrefix: PropTypes.string,
  movies: PropTypes.array,
  isFetchingMovies: PropTypes.bool,
  fetchMore: PropTypes.func,
  handleMoviePress: PropTypes.func,
};

MoviesList.defaultProps = {
  urlPrefix: '',
  movies: [],
  isFetchingMovies: false,
  fetchMore: () => {},
  handleMoviePress: () => {},
};
