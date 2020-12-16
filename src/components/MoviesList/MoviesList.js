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
  testID,
}) => {
  const renderFooter = () => <ActivityIndicator size="large" />;

  const renderItem = ({ item }) => {
    const { id, poster_path: path, title } = item;
    return (
      <MoviesListItem
        testID={testID}
        id={id}
        title={title}
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
  testID: PropTypes.string.isRequired,
};

MoviesList.defaultProps = {
  urlPrefix: '',
  movies: [],
  isFetchingMovies: false,
  fetchMore: () => {},
  handleMoviePress: () => {},
};
