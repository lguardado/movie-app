import { StyleSheet } from 'react-native';

const getStyles = ({ colors }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      top: -100,
      color: colors.backgroundColor,
    },
    movieCard: {
      height: 300,
    },
    movieCardPlaceholder: {
      backgroundColor: colors.backgroundColor,
      alignSelf: 'center',
      padding: 20,
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
      borderColor: colors.primary,
      borderWidth: StyleSheet.hairlineWidth,
      flex: 1,
    },
    thumbPlaceholder: {
      width: 125,
      justifyContent: 'center',
      alignItems: 'center',
      height: 188,
      borderColor: colors.primary,
      backgroundColor: colors.primary,
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
      color: colors.text,
    },
  });

export default getStyles;
