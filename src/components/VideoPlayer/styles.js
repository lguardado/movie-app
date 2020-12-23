import { StyleSheet } from 'react-native';

const getStyles = ({ colors }, isLoading) =>
  StyleSheet.create({
    loadingContainer: {
      paddingTop: '50%',
      marginBottom: 200,
      flex: 1,
      backgroundColor: colors.backgroundColor,
    },
    webView: {
      flex: 1,
      display: isLoading ? 'none' : 'flex',
    },
  });

export default getStyles;
