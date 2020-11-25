import { StyleSheet } from 'react-native';
import Colors from 'constants/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
  },
  loading: {
    backgroundColor: Colors.black,
    flex: 1,
  },
  logoIcon: {
    marginTop: 50,
  },
  error: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.black,
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
