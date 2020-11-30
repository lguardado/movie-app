import React from 'react';
import { View } from 'react-native';
import { PropTypes } from 'prop-types';
import styles from './styles';

const Center = ({ children, style }) => {
  return (
    <View style={{ ...styles.centeredContainer, ...style }}>{children}</View>
  );
};

export default Center;

Center.propTypes = {
  children: PropTypes.object,
  style: PropTypes.object,
};

Center.defaultProps = {
  children: null,
  style: {},
};
