import React from 'react';
import { ScrollView, Text, ImageBackground, View, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { PropTypes } from 'prop-types';
import styles from './styles';
import MovieInfo from 'components/MovieInfo/MovieInfo';
import textStyles from 'helpers/TextStyles';

const Details = ({ route }) => {
  const { colors } = useTheme();
  const { movie, genres, prefixUrl } = route.params;

  const uri = prefixUrl + movie.backdrop_path;
  const thumbUri = prefixUrl + movie.poster_path;

  return (
    <ScrollView testID="detail-scroll-view">
      <ImageBackground
        testID="image-background"
        source={{
          uri,
        }}
        style={styles.movieCard}
        resizeMode="cover"
      />
      <View
        style={[styles.container, { backgroundColor: colors.backgroundColor }]}
      >
        <View style={styles.detailHeader}>
          <Image
            source={{
              uri: thumbUri,
            }}
            style={styles.posterThumb}
            resizeMode="contain"
          />
          <Text
            style={[
              { color: colors.primary },
              styles.title,
              textStyles.alignCenter,
            ]}
          >
            {movie.title}{' '}
            {movie.title !== movie.original_title
              ? `(${movie.original_title})`
              : ''}
          </Text>
        </View>
        <MovieInfo
          testID="movie-info"
          releaseDate={movie.release_date}
          voteAverage={movie.vote_average}
          overview={movie.overview}
          genres={genres}
        />
      </View>
    </ScrollView>
  );
};

export default Details;

const Movie = {
  overview: PropTypes.string,
  title: PropTypes.string,
  poster_path: PropTypes.string,
  vote_average: PropTypes.number,
  release_date: PropTypes.string,
};

const MovieShape = PropTypes.shape(Movie);

Details.propTypes = {
  route: PropTypes.object,
  movie: MovieShape,
};

Details.defaultProps = {
  route: {},
  movie: {},
};
