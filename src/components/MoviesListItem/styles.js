import { StyleSheet } from 'react-native';

import Colors from 'constants/colors';

const styles = StyleSheet.create({
  item: {
    height: 600,
    margin: 5,
  },
  loading: {
    color: Colors.white,
    textAlign: 'center',
  },
  favourite: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    top: 20,
    backgroundColor: 'gray',
    opacity: 0.8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    zIndex: 1,
  },
  star: {
    width: 25,
    height: 25,
    marginLeft: 10,
  },
});

export default styles;
