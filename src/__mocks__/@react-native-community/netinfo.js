/**
 * @format
 */
/* eslint-env jest */

const defaultState = {
  type: 'cellular',
  isConnected: true,
  isInternetReachable: true,
  details: {
    isConnectionExpensive: true,
    cellularGeneration: '3g',
  },
};

const RNCNetInfoMock = {
  configure: jest.fn(),
  fetch: jest.fn(),
  addEventListener: jest.fn(),
  useNetInfo: jest.fn(),
};

RNCNetInfoMock.fetch.mockResolvedValue(defaultState);
RNCNetInfoMock.useNetInfo.mockResolvedValue(defaultState);

module.exports = RNCNetInfoMock;

// export default {
//   getCurrentConnectivity: jest.fn(),
//   isConnectionMetered: jest.fn(),
//   addListener: jest.fn(),
//   removeListeners: jest.fn(),
//   isConnected: {
//     fetch: () => {
//       return Promise.resolve(true);
//     },
//     addEventListener: jest.fn(),
//     removeEventListener: jest.fn(),
//   },
//   configure: jest.fn(),
// };
