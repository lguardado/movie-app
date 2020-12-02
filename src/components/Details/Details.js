import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, Text, ImageBackground, View, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { PropTypes } from 'prop-types';

import styles from './styles';
import { fetchGenres } from 'controllers/MoviesClient';
import MovieInfo from 'components/MovieInfo/MovieInfo';
import textStyles from 'helpers/TextStyles';

const Details = ({ route }) => {
  const [genres, setGenres] = useState([]);
  const [isFetchingGenres, setIsFetchingGenres] = useState(false);
  const { colors } = useTheme();
  const {
    prefixUrl,
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

  const getGenresNames = useCallback((ids, resGenres) => {
    return ids && resGenres
      ? ids.map(id => {
          const foundGenre = resGenres.find(genre => genre.id === id);
          return foundGenre ? foundGenre.name : null;
        })
      : [];
  }, []);

  const fetchGenresCallback = useCallback(async () => {
    setIsFetchingGenres(true);
    const res = await fetchGenres();
    const genresNames = getGenresNames(genreIds, res.genres);
    setGenres(genresNames);
    setIsFetchingGenres(false);
  }, [setGenres, getGenresNames, genreIds]);

  useEffect(() => {
    fetchGenresCallback();
  }, [fetchGenresCallback]);
  const uri = prefixUrl + backdropPath;
  const thumbUri = prefixUrl + posterPath;

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
          genres={genres}
          isFetchingGenres={isFetchingGenres}
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
