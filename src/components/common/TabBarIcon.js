import PropTypes from 'prop-types';
import React from 'react';
import { Image } from 'react-native';
import homeIcon from 'assets/ic_home/ic_home.png';
import searchIcon from 'assets/ic_search/ic_search.png';
import settingsIcon from 'assets/ic_settings/ic_settings.png';
import navigationConstants from 'constants/navigation';

const tabIcon = {
  [navigationConstants.home]: homeIcon,
  [navigationConstants.configuration]: settingsIcon,
  [navigationConstants.search]: searchIcon,
};

function TabBarIcon({ name, color, testID }) {
  return (
    <Image
      source={tabIcon[name]}
      style={{ tintColor: color }}
      testID={testID}
    />
  );
}

TabBarIcon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  testID: PropTypes.string.isRequired,
};

export default TabBarIcon;
