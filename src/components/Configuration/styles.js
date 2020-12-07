import { StyleSheet } from 'react-native';
import Colors from 'constants/colors';

const styles = StyleSheet.create({
  description: {
    margin: 20,
  },
  input: {
    borderWidth: 1,
    marginHorizontal: 140,
    padding: 10,
    fontSize: 30,
    textAlign: 'center',
  },
  button: {
    width: 150,
    alignSelf: 'center',
    alignItems: 'center',
  },
  title: {
    margin: 20,
  },
  saved: {
    color: Colors.green,
    textAlign: 'center',
  },
  text: {
    margin: 20,
    textAlign: 'center',
  },
  noMarginBottom: {
    marginBottom: 0,
  },
});

export default styles;
