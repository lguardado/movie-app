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
  movieCardPlaceholder: {
    backgroundColor: Colors.lightGray,
    alignItems: 'center',
    width: '100%',
    padding: 20,
    flex: 1,
    height: 300,
    position: 'absolute',
  },
  detailHeader: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  posterThumb: {
    width: 200,
    height: 190,
    borderColor: Colors.white,
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
  },
  thumbPlaceholder: {
    width: 125,
    justifyContent: 'center',
    alignItems: 'center',
    height: 188,
    borderColor: Colors.white,
    backgroundColor: 'white',
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    position: 'absolute',
  },
  thumbPlaceholderImage: {
    width: 100,
    height: 100,
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
