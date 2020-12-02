import React from 'react';
import { Image, Pressable } from 'react-native';
import { PropTypes } from 'prop-types';

import styles from 'components/MoviesListItem/styles';

const MoviesListItem = ({ uri, handleMoviePress }) => {
  return (
    uri && (
      <Pressable onPress={handleMoviePress}>
        <Image
          testID="movie-image"
          source={{
            uri,
          }}
          style={styles.item}
          resizeMode="contain"
        />
      </Pressable>
    )
  );
};

export default MoviesListItem;

MoviesListItem.propTypes = {
  uri: PropTypes.string,
  handleMoviePress: PropTypes.func,
};

MoviesListItem.defaultProps = {
  uri: '',
  handleMoviePress: () => {},
};
