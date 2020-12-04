import React from 'react';
import { Text, Pressable } from 'react-native';
import { PropTypes } from 'prop-types';
import strings from 'localization';

import textStyles from 'helpers/TextStyles';
import styles from 'components/MyListButton/styles';

const MyListButton = ({ isFavourite, handleFavouritePress }) => {
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
