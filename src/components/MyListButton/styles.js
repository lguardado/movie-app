import { StyleSheet } from 'react-native';

const getStyles = ({ colors }) =>
  StyleSheet.create({
    favourite: {
      padding: 10,
      flex: 1,
      textAlign: 'center',
      backgroundColor: colors.backgroundColor,
      color: colors.text,
    },
  });

export default getStyles;
