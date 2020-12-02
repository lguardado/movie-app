import { renderHook, cleanup } from '@testing-library/react-hooks';
import usePrefixUrl from 'components/common/hooks/usePrefixUrl';
import { fetchConfiguration } from 'controllers/MoviesClient';

jest.mock('controllers/MoviesClient');

describe('usePrefixUrl hook', () => {
  afterEach(cleanup);

  test('custom hook initial state', () => {
    const { result } = renderHook(() => usePrefixUrl());
    // assert initial state

    const [isFetching, prefixUrl] = result.current;
    expect(isFetching).toBeTruthy();
    expect(prefixUrl).toEqual('');
  });

  test('custom hook return state', async () => {
    // set call to be resolved ok
    fetchConfiguration.mockResolvedValue(
      Promise.resolve({
        images: {
          base_url: 'http://foo.bar/',
          backdrop_sizes: ['w300', 'w780'],
        },
      })
    );

    const { result, waitForNextUpdate } = renderHook(() => usePrefixUrl());

    // await for state to change
    await waitForNextUpdate();

    const [isFetching, prefixUrl] = result.current;

    expect(isFetching).toBeFalsy();
    expect(prefixUrl).toEqual('http://foo.bar/w780');
  });
});
