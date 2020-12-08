import React from 'react';
import { Text, Pressable } from 'react-native';
import { PropTypes } from 'prop-types';
import { useTheme } from '@react-navigation/native';
import strings from 'localization';

import textStyles from 'helpers/TextStyles';
import getStyles from 'components/MyListButton/styles';

const MyListButton = ({ isFavourite, handleFavouritePress }) => {
  const styles = getStyles(useTheme());
  return (
    <Pressable onPress={handleFavouritePress} testID="pressable">
      {!isFavourite ? (
        <Text style={[textStyles.boldTitle, styles.favourite]}>
          {strings.myList}
        </Text>
      ) : (
        <Text style={[textStyles.boldTitle, styles.favourite]}>
          {strings.removeFromMyList}
        </Text>
      )}
    </Pressable>
  );
};

export default MyListButton;

MyListButton.propTypes = {
  handleFavouritePress: PropTypes.func,
  isFavourite: PropTypes.bool,
};

MyListButton.defaultProps = {
  handleFavouritePress: () => {},
  isFavourite: false,
};
