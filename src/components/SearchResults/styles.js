import { StyleSheet } from 'react-native';

const getStyles = ({ colors }) =>
  StyleSheet.create({
    text: {
      color: colors.text,
      marginHorizontal: 35,
      fontSize: 20,
      textAlign: 'center',
    },
  });

export default getStyles;
