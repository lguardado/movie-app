import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import Star from 'react-native-star-view';

import { PropTypes } from 'prop-types';

import styles from './styles';
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
}) => {
  const renderStar = useMemo(() => {
    return (
      <Star
        style={[textStyles.alignCenter, styles.rate]}
        score={(voteAverage * 5) / 10}
      />
    );
  }, [voteAverage]);
  return (
    <>
      <View style={styles.infoContainer}>
        <View style={styles.favourite}>
          <MyListButton
            handleFavouritePress={handleFavouritePress}
            isFavourite={isFavourite}
          />
        </View>
        <View style={styles.mainInfo}>
          <Text style={[textStyles.alignCenter, textStyles.textMedium]}>
            {genres.join(' ')}
          </Text>
          <Text style={[textStyles.alignCenter, styles.fontSmall]}>
            {strings.releaseDate}: {releaseDate}
          </Text>
          <View style={styles.rate}>
            <Text style={textStyles.textMedium}>{voteAverage.toFixed(1)}</Text>
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
};

MovieInfo.defaultProps = {
  releaseDate: '',
  voteAverage: 0,
  overview: '',
  genres: [],
  isFavourite: false,
  handleFavouritePress: () => {},
};
