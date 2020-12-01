import React from 'react';
import { Text, View } from 'react-native';
import Star from 'react-native-star-view';
import { PropTypes } from 'prop-types';

import styles from './styles';
import strings from 'localization';
import textStyles from 'helpers/TextStyles';

const MovieInfo = ({ releaseDate, voteAverage, overview, genres }) => {
  const renderGenres = g => g.join(', ');

  return (
    <>
      <Text
        style={[textStyles.alignCenter, styles.genres, textStyles.textMedium]}
      >
        {renderGenres(genres)}
      </Text>
      <Text style={[textStyles.alignCenter, styles.fontSmall]}>
        {strings.releaseDate}: {releaseDate}
      </Text>
      <View style={styles.rate}>
        <Text style={textStyles.textMedium}>{voteAverage.toFixed(1)}</Text>
        <View testID="star-rate">
          <Star
            style={[textStyles.alignCenter, styles.rate]}
            score={(voteAverage * 5) / 10}
          />
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
};

MovieInfo.defaultProps = {
  releaseDate: '',
  voteAverage: 0,
  overview: '',
  genres: [],
};
