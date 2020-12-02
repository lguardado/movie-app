import React, { useCallback, useState, useEffect } from 'react';
import { View, Image, Text, ActivityIndicator } from 'react-native';
import { PropTypes } from 'prop-types';

import useFetchMovies from 'components/common/hooks/useFetchMovies';
import Center from 'components/Center';
import strings from 'localization';
import logoIcon from 'assets/ic_logo/ic_logo.png';
import styles from 'components/Home/styles';
import MoviesList from 'components/MoviesList';
import useFetchPrefixUrl from 'components/common/hooks/usePrefixUrl';
import navigationConstants from 'constants/navigation';

function Home({ navigation }) {
  const [isFetching, prefixUrl] = useFetchPrefixUrl();

  const {
    movies,
    fetchMore,
    isFetchingMovies,
    errorFetchingMovies,
  } = useFetchMovies();

  const handleMoviePress = currentItem => {
    navigation.navigate(navigationConstants.details, {
      movie: currentItem,
      prefixUrl,
    });
  };

  return !errorFetchingMovies ? (
    <>
      {(isFetching || isFetchingMovies) && (
        <Center testID="loading" style={styles.loading}>
          <ActivityIndicator size="large" />
        </Center>
      )}
      <View testID="moviesContainer" style={styles.container}>
        <Center>
          <Image source={logoIcon} style={styles.logoIcon} />
        </Center>
        {!isFetching && (
          <MoviesList
            movies={movies}
            urlPrefix={prefixUrl}
            isFetchingMovies={isFetchingMovies}
            fetchMore={fetchMore}
            handleMoviePress={handleMoviePress}
          />
        )}
      </View>
    </>
  ) : (
    <View testID="error" style={styles.error}>
      <Text style={styles.errorText}>{strings.errorFetching}</Text>
      <Text style={styles.errorText}>{errorFetchingMovies}</Text>
    </View>
  );
}
export default Home;

Home.propTypes = {
  navigation: PropTypes.object,
};

Home.defaultProps = {
  navigation: {},
};
