import React, { useState } from 'react';
import { ActivityIndicator, Image, Pressable, Text, View } from 'react-native';
import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

import strings from 'localization';
import noImage from 'assets/img_placeholder/not-found.png';
import starIcon from 'assets/ic_star/ic_star.png';
import getStyles from 'components/MoviesListItem/styles';
import { isFavourite } from 'selectors/MoviesSelectors';
import textStyles from 'helpers/TextStyles';
import Colors from 'constants/colors';

const MoviesListItem = ({ uri, handleMoviePress, id, title, testID }) => {
  const styles = getStyles(useTheme());
  const isFav = useSelector(state => isFavourite(state, id));
  const [loadingImage, setLoadingImage] = useState(true);

  return (
    uri && (
      <Pressable onPress={handleMoviePress} testID={testID}>
        <View>
          {loadingImage && <ActivityIndicator />}
          {!loadingImage && isFav ? (
            <View style={styles.favourite} testID="favourite">
              <Text style={[textStyles.fieldTitle, { color: Colors.white }]}>
                {strings.myList}
              </Text>
              <View>
                <Image style={styles.star} source={starIcon} />
              </View>
            </View>
          ) : null}
          <View style={styles.imagePlaceholder} testID="movie-placeholder">
            <Text style={styles.placeholderTitle}>{title}</Text>
            <Image source={noImage} resizeMode="center" />
          </View>

          {uri !== '' && (
            <FastImage
              testID="movie-image"
              onLoadEnd={() => setLoadingImage(false)}
              source={{
                uri,
              }}
              style={styles.item}
              resizeMode={FastImage.resizeMode.contain}
            />
          )}
        </View>
      </Pressable>
    )
  );
};

export default MoviesListItem;

MoviesListItem.propTypes = {
  id: PropTypes.number,
  uri: PropTypes.string,
  testID: PropTypes.string.isRequired,
  title: PropTypes.string,
  handleMoviePress: PropTypes.func,
};

MoviesListItem.defaultProps = {
  id: null,
  uri: '',
  title: '',
  handleMoviePress: () => {},
};
