import { renderHook, cleanup } from '@testing-library/react-hooks';
import useFetchMovies from '../useFetchMovies';
import { fetchMovies } from 'controllers/MoviesClient';

jest.mock('controllers/MoviesClient');

beforeEach(cleanup);

test('custom hook initial state', () => {
  const { result } = renderHook(() => useFetchMovies());
  // assert initial state
  expect(result.current.movies).toEqual([]);
  expect(result.current.isFetching).toBeTruthy();
  expect(result.current.error).toBeNull();
});

test('custom hook return state', async () => {
  // set call to be resolved ok
  fetchMovies.mockResolvedValueOnce(
    Promise.resolve({
      results: [
        { id: 'foo', poster_path: '/foo.jpeg' },
        { id: 'bar', poster_path: '/bar.jpeg' },
      ],
    })
  );

  const { result, waitForNextUpdate } = renderHook(() => useFetchMovies());

  // assert initial state
  expect(result.current.movies).toEqual([]);
  expect(result.current.isFetching).toBeTruthy();
  expect(result.current.error).toBeNull();

  // await for state to change
  await waitForNextUpdate();

  expect(result.current.isFetching).toBeFalsy();
  expect(result.current.error).toBeNull();
  expect(result.current.movies).toHaveLength(2);
  expect(result.current.movies).toEqual([
    { id: 'foo', poster_path: '/foo.jpeg' },
    { id: 'bar', poster_path: '/bar.jpeg' },
  ]);
});

test('custom hook error state', async () => {
  // set call to be rejected with an error
  fetchMovies.mockRejectedValueOnce(
    Promise.reject(new Error({ message: 'foo error' }))
  );
  const { result, waitForNextUpdate } = renderHook(() => useFetchMovies());

  // await for state to change
  await waitForNextUpdate();

  expect(result.current.movies).toEqual([]);
  expect(result.current.error).not.toBeNull();
  expect(result.current.error.message).not.toEqual('foo error');
  expect(result.current.isFetching).toBeFalsy();
});
