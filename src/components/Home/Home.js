import React, { useEffect } from 'react';
import { View, Image, ActivityIndicator } from 'react-native';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import ErrorView from 'components/common/ErrorView';
import errorsSelector from 'selectors/ErrorSelectors';
import { isLoadingSelector } from 'selectors/StatusSelectors';
import { getMovies, getPage, getPrefixUrl } from 'selectors/MoviesSelectors';
import { actionTypes, fetchMovies, fetchPrefix } from 'actions/MoviesActions';
import navigationConstants from 'constants/navigation';
import Center from 'components/Center';
import logoIcon from 'assets/ic_logo/ic_logo.png';
import styles from 'components/Home/styles';
import MoviesList from 'components/MoviesList';

function Home({ navigation }) {
  const dispatch = useDispatch();

  const isLoading = useSelector(
    state => isLoadingSelector([actionTypes.FETCH_MOVIES], state),
    shallowEqual
  );

  const errors = useSelector(
    state => errorsSelector([actionTypes.FETCH_MOVIES], state),
    shallowEqual
  );

  const prefixUrl = useSelector(state => getPrefixUrl(state));
  const movies = useSelector(state => getMovies(state));
  const currentPage = useSelector(state => getPage(state));

  const handleMoviePress = currentItem => {
    navigation.navigate(navigationConstants.details, {
      movie: currentItem,
    });
  };

  const fetchMore = () => {
    dispatch(fetchMovies(currentPage));
  };

  useEffect(() => {
    if (!movies.length) {
      dispatch(fetchMovies());
    }
    dispatch(fetchPrefix());
  }, [dispatch, movies]);

  return (
    <>
      <ErrorView errors={errors} />
      {isLoading && (
        <Center testID="loading" style={styles.loading}>
          <ActivityIndicator size="large" />
        </Center>
      )}
      <View testID="moviesContainer" style={styles.container}>
        <Center>
          <Image source={logoIcon} style={styles.logoIcon} />
        </Center>
        <MoviesList
          movies={movies}
          urlPrefix={prefixUrl}
          isFetchingMovies={isLoading}
          fetchMore={fetchMore}
          handleMoviePress={handleMoviePress}
        />
      </View>
    </>
  );
}

export default Home;

Home.propTypes = {
  navigation: PropTypes.object,
};

Home.defaultProps = {
  navigation: {},
};
