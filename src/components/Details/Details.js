import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView, Text, View, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTheme } from '@react-navigation/native';

import getStyles from './styles';
import noImage from 'assets/img_placeholder/not-found.png';
import MovieInfo from 'components/MovieInfo/MovieInfo';
import textStyles from 'helpers/TextStyles';
import {
  getGenresNames,
  getPrefixUrl,
  isFavourite,
} from 'selectors/MoviesSelectors';
import {
  addFavourite,
  removeFavourite,
  fetchGenres,
} from 'actions/MoviesActions';

const Details = ({ route }) => {
  const dispatch = useDispatch();
  const styles = getStyles(useTheme());
  const {
    movie: {
      id,
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
  const isFav = useSelector(state => isFavourite(state, id));

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  const onAddFavourite = movieId => dispatch(addFavourite(movieId));

  const onRemoveFavourite = movieId => dispatch(removeFavourite(movieId));

  const onToggleMovie = () => {
    if (isFav) {
      onRemoveFavourite(id);
    } else {
      onAddFavourite(id);
    }
  };

  return (
    <ScrollView testID="detail-scroll-view">
      <View style={styles.movieCardPlaceholder} testID="placeholder">
        <Image source={noImage} resizeMode="center" />
      </View>
      {uri && (
        <FastImage
          testID="image-background"
          source={{
            uri,
          }}
          style={styles.movieCard}
          resizeMode={FastImage.resizeMode.cover}
        />
      )}
      <View style={styles.container}>
        <View style={styles.detailHeader}>
          <View style={styles.thumbPlaceholder}>
            <Image
              source={noImage}
              resizeMode="stretch"
              style={styles.thumbPlaceholderImage}
            />
          </View>
          {thumbUri && (
            <FastImage
              source={{
                uri: thumbUri,
              }}
              style={styles.posterThumb}
              resizeMode={FastImage.resizeMode.contain}
            />
          )}
          <Text style={[styles.title, textStyles.alignCenter]}>
            {title} {title !== originalTitle ? `(${originalTitle})` : ''}
          </Text>
        </View>
        <MovieInfo
          testID="movie-info"
          releaseDate={releaseDate}
          voteAverage={voteAverage}
          overview={overview}
          genres={genresNames}
          isFavourite={isFav}
          handleFavouritePress={onToggleMovie}
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
