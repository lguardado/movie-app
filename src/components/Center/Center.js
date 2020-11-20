import React from 'react';
import { View } from 'react-native';
import styles from './styles';

const Center = ({ children }) => {
  return <View style={styles.centeredContainer}>{children}</View>;
};

export default Center;

Center.propTypes = {
  children: React.Children,
};

Center.defaultProps = {
  children: null,
};
