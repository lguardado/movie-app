import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import error from 'reducers/ErrorReducer';
import status from 'reducers/StatusReducer';
import user from 'reducers/UserReducer';
import movies from 'reducers/MoviesReducer';

const moviesPersistConfig = {
  key: 'movies',
  storage: AsyncStorage,
  whitelist: ['favourites'],
};

export default combineReducers({
  error,
  status,
  user,
  movies: persistReducer(moviesPersistConfig, movies),
});
