import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  loading: {
    backgroundColor: 'black',
    flex: 1,
  },
  logoIcon: {
    marginTop: 50,
  },
  error: {
    flex: 1,
    padding: 20,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
});

export default styles;
