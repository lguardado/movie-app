import { StyleSheet } from 'react-native';
import Colors from 'constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    top: -100,
  },
  movieCard: {
    height: 300,
  },
  detailHeader: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    // top: -100,
  },
  posterThumb: {
    width: 200,
    height: 190,
    borderColor: Colors.white,
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
  },
  title: {
    fontSize: 30,
    flex: 2,
    marginTop: 65,
    marginLeft: 2,
    flexWrap: 'wrap',
    // todo: remove this when enabling themes
    color: Colors.coral,
  },
});

export default styles;
