import { StyleSheet } from 'react-native';

const getStyles = ({ colors }) =>
  StyleSheet.create({
    infoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 20,
      flex: 1,
    },
    favourite: {
      flex: 1,
    },
    mainInfo: {
      flex: 2,
    },
    text: {
      color: colors.text,
      backgroundColor: colors.background,
    },
    rate: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    overview: {
      color: colors.text,
      backgroundColor: colors.background,
      paddingVertical: 20,
    },
  });

export default getStyles;
