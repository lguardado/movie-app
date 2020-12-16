import { StyleSheet } from 'react-native';

const getStyles = ({ colors }) =>
  StyleSheet.create({
    item: {
      height: 600,
      margin: 5,
    },
    imagePlaceholder: {
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      width: '96%',
      height: 600,
      padding: 20,
      flex: 1,
      borderTopColor: colors.primary,
      borderBottomColor: colors.primary,
      borderWidth: StyleSheet.hairlineWidth,
      position: 'absolute',
    },
    loading: {
      color: colors.primary,
      textAlign: 'center',
    },
    favourite: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
      right: 20,
      top: 20,
      backgroundColor: colors.primary,
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
    placeholderTitle: {
      position: 'absolute',
      color: colors.text,
      textAlign: 'center',
      bottom: 200,
    },
  });

export default getStyles;
