import { StyleSheet } from 'react-native';

const getStyles = ({ colors }) =>
  StyleSheet.create({
    pressable: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 30,
    },
    icon: {
      tintColor: colors.text,
    },
    input: {
      borderWidth: 1,
      marginHorizontal: 20,
      padding: 10,
      fontSize: 20,
      minWidth: '90%',
      color: colors.text,
      borderColor: colors.secondary,
    },
    text: {
      color: colors.text,
      margin: 20,
      textAlign: 'center',
    },
    noMarginBottom: {
      marginBottom: 0,
    },
  });

export default getStyles;
