import React, { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { PropTypes } from 'prop-types';

import styles from 'components/MoviesListItem/styles';

const MoviesListItem = ({ uri, handleMoviePress }) => {
  const [loadingImage, setLoadingImage] = useState(false);
  return (
    uri && (
      <Pressable onPress={handleMoviePress}>
        <View>
          {loadingImage && <Text style={styles.loading}>Loading...</Text>}
          <Image
            testID="movie-image"
            source={{
              uri,
            }}
            onLoadStart={() => setLoadingImage(true)}
            onLoadEnd={() => setLoadingImage(false)}
            style={styles.item}
            resizeMode="contain"
          />
        </View>
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
