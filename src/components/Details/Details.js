import React from 'react';
import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';
import { ScrollView, Text, ImageBackground, View, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';

import styles from './styles';
import MovieInfo from 'components/MovieInfo/MovieInfo';
import textStyles from 'helpers/TextStyles';
import { getGenres, getPrefixUrl } from 'selectors/MoviesSelectors';

const Details = ({ route }) => {
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
  const genres = useSelector(state => getGenres(state));
  const uri = prefixUrl + backdropPath;
  const thumbUri = prefixUrl + posterPath;

  const getGenresNames = ids => {
    return ids.map(id => {
      const foundGenre = genres.find(genre => genre.id === id);
      return foundGenre ? foundGenre.name : null;
    });
  };

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
          genres={getGenresNames(genreIds)}
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
