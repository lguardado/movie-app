import React, { useState } from 'react';
import { ActivityIndicator, Image, Pressable, Text, View } from 'react-native';
import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';

import starIcon from 'assets/ic_star/ic_star.png';
import styles from 'components/MoviesListItem/styles';
import { isFavourite } from 'selectors/MoviesSelectors';
import textStyles from 'helpers/TextStyles';
import Colors from 'constants/colors';

const MoviesListItem = ({ uri, handleMoviePress, id }) => {
  const isFav = useSelector(state => isFavourite(state, id));
  const [loadingImage, setLoadingImage] = useState(true);

  return (
    uri && (
      <Pressable onPress={handleMoviePress}>
        <View>
          {!loadingImage && isFav ? (
            <View style={styles.favourite} testID="favourite">
              <Text style={[textStyles.fieldTitle, { color: Colors.white }]}>
                In my list
              </Text>
              <View>
                {loadingImage && <ActivityIndicator />}
                <Image style={styles.star} source={starIcon} />
              </View>
            </View>
          ) : null}
          <Image
            testID="movie-image"
            onLoadEnd={() => setLoadingImage(false)}
            source={{
              uri,
            }}
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
  id: PropTypes.number,
  uri: PropTypes.string,
  handleMoviePress: PropTypes.func,
};

MoviesListItem.defaultProps = {
  id: null,
  uri: '',
  handleMoviePress: () => {},
};
