import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'reducers';

const initialStore = {
  error: {},
  status: {},
  user: {},
  movies: {
    data: [],
    page: 1,
    prefixUrl: '',
    favourites: [],
    lastFetchDate: null,
    dataExpirationDays: 1,
  },
};

export default function configureStore(initialState = initialStore) {
  return createStore(rootReducer, initialState, applyMiddleware(thunk));
}
