import { NavigationContainer } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import AuthNavigator from 'navigation/AuthNavigator';
import AppNavigator from 'navigation/AppNavigator';

function Navigation({ theme }) {
  return (
    <NavigationContainer theme={theme}>
      <AppNavigator />
    </NavigationContainer>
  );
}

Navigation.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default Navigation;
