import React, { useCallback, useEffect, useRef } from 'react';
import { View, Image, ActivityIndicator, AppState } from 'react-native';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { purge } from 'store';

import ErrorView from 'components/common/ErrorView';
import errorsSelector from 'selectors/ErrorSelectors';
import { isLoadingSelector } from 'selectors/StatusSelectors';
import {
  getMovies,
  getPage,
  getPrefixUrl,
  getLastFetchDate,
  getDataExpirationDays,
} from 'selectors/MoviesSelectors';
import {
  actionTypes,
  fetchMovies,
  fetchPrefix,
  setLastFecthDate,
  clearStore,
} from 'actions/MoviesActions';
import navigationConstants from 'constants/navigation';
import Center from 'components/Center';
import logoIcon from 'assets/ic_logo/ic_logo.png';
import styles from 'components/Home/styles';
import MoviesList from 'components/MoviesList';

function Home({ navigation }) {
  const appState = useRef(AppState.currentState);
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
  const lastFetchDate = useSelector(state => getLastFetchDate(state));
  const dataExpirationDays = useSelector(state => getDataExpirationDays(state));

  const handleMoviePress = currentItem => {
    navigation.navigate(navigationConstants.details, {
      movie: currentItem,
    });
  };

  const fetchMore = () => {
    dispatch(fetchMovies(currentPage));
  };

  const getDays = ms => {
    if (!ms) {
      return -1;
    }
    const minutes = Math.floor(ms / 60000);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);
    return days;
  };

  const checkDataValidity = useCallback(() => {
    let daysOld;
    if (!lastFetchDate) {
      daysOld = 0;
      dispatch(setLastFecthDate(new Date()));
    } else {
      daysOld = getDays(new Date() - new Date(lastFetchDate));
    }
    if (daysOld > dataExpirationDays) {
      dispatch(clearStore());
      purge();
    }
  }, [dataExpirationDays, dispatch, lastFetchDate]);

  const fetchMoviesIfNeeded = useCallback(
    (isConnected = true) => {
      if (movies && !movies.length && isConnected) {
        dispatch(fetchMovies());
      }
    },
    [dispatch, movies]
  );

  const handleAppStateChange = useCallback(
    nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        checkDataValidity();
        fetchMoviesIfNeeded();
      }
      appState.current = nextAppState;
    },
    [fetchMoviesIfNeeded, checkDataValidity]
  );

  // Configure NetInfo to check internet connection in 15
  // seconds preiods
  useEffect(() => {
    NetInfo.configure({
      reachabilityRequestTimeout: 15 * 1000, // 15s
    });
    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, [handleAppStateChange]);

  // Adding event listener to fetch movies when there is
  // internet connection again and no movies in the store
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      fetchMoviesIfNeeded(state.isConnected);
    });
    return () => unsubscribe;
  });

  // Checking here if the data is past due
  useEffect(() => {
    checkDataValidity();
  }, [checkDataValidity]);

  useEffect(() => {
    dispatch(fetchPrefix());
  }, [dispatch, movies, lastFetchDate]);

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
