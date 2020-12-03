import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView, Text, ImageBackground, View, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';

import styles from './styles';
import { fetchGenres } from 'actions/MoviesActions';
import MovieInfo from 'components/MovieInfo/MovieInfo';
import textStyles from 'helpers/TextStyles';
import { getGenresNames, getPrefixUrl } from 'selectors/MoviesSelectors';

const Details = ({ route }) => {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const {
    movie: {
      backdrop_path: backdropPath,
      poster_path: posterPath,
      title,
      original_title: originalTitle,
      overview,
      release_date: releaseDate,
      vote_average: voteAverage,
      genre_ids: genreIds,
    },
  } = route.params;

  const prefixUrl = useSelector(state => getPrefixUrl(state));
  const genresNames = useSelector(state => getGenresNames(state, genreIds));
  const uri = prefixUrl + backdropPath;
  const thumbUri = prefixUrl + posterPath;

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

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
            {title} {title !== originalTitle ? `(${originalTitle})` : ''}
          </Text>
        </View>
        <MovieInfo
          testID="movie-info"
          releaseDate={releaseDate}
          voteAverage={voteAverage}
          overview={overview}
          genres={genresNames}
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
