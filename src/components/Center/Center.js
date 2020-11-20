import React from 'react';
import { View } from 'react-native';
import { PropTypes } from 'prop-types';
import styles from './styles';

const Center = ({ children }) => {
  return <View style={styles.centeredContainer}>{children}</View>;
};

export default Center;

Center.propTypes = {
  children: PropTypes.func,
};

Center.defaultProps = {
  children: null,
};
