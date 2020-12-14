import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import Star from 'react-native-star-view';
import { useTheme } from '@react-navigation/native';

import { PropTypes } from 'prop-types';

import getStyles from './styles';
import strings from 'localization';
import textStyles from 'helpers/TextStyles';
import MyListButton from 'components/MyListButton';

const MovieInfo = ({
  releaseDate,
  voteAverage,
  overview,
  genres,
  isFavourite,
  handleFavouritePress,
  testID,
}) => {
  const styles = getStyles(useTheme());
  const renderStar = useMemo(() => {
    return (
      <Star
        style={[textStyles.alignCenter, styles.rate]}
        score={(voteAverage * 5) / 10}
      />
    );
  }, [voteAverage, styles.rate]);
  return (
    <>
      <View style={styles.infoContainer} testID={testID}>
        <View style={styles.favourite}>
          <MyListButton
            handleFavouritePress={handleFavouritePress}
            isFavourite={isFavourite}
          />
        </View>
        <View style={styles.mainInfo}>
          <Text
            style={[textStyles.alignCenter, textStyles.textMedium, styles.text]}
          >
            {genres.join(' ')}
          </Text>
          <Text style={[textStyles.alignCenter, styles.fontSmall, styles.text]}>
            {strings.releaseDate}: {releaseDate}
          </Text>
          <View style={styles.rate}>
            <Text style={[textStyles.textMedium, styles.text]}>
              {voteAverage.toFixed(1)}
            </Text>
            <View testID="star-rate">{renderStar}</View>
          </View>
        </View>
      </View>
      <Text style={[styles.overview, textStyles.textMedium, textStyles.italic]}>
        {overview}
      </Text>
    </>
  );
};

export default MovieInfo;

MovieInfo.propTypes = {
  releaseDate: PropTypes.string,
  voteAverage: PropTypes.number,
  overview: PropTypes.string,
  genres: PropTypes.array,
  isFavourite: PropTypes.bool,
  handleFavouritePress: PropTypes.func,
  testID: PropTypes.string.isRequired,
};

MovieInfo.defaultProps = {
  releaseDate: '',
  voteAverage: 0,
  overview: '',
  genres: [],
  isFavourite: false,
  handleFavouritePress: () => {},
};
