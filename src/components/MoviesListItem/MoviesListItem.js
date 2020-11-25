import React from 'react';
import { Image } from 'react-native';
import { PropTypes } from 'prop-types';

import styles from 'components/MoviesListItem/styles';

const MoviesListItem = ({ uri }) => {
  return (
    uri && (
      <Image
        testID="movieImage"
        source={{
          uri,
        }}
        style={styles.item}
        resizeMode="contain"
      />
    )
  );
};

export default MoviesListItem;

MoviesListItem.propTypes = {
  uri: PropTypes.string,
};

MoviesListItem.defaultProps = {
  uri: '',
};
