import React from 'react';
import { Pressable, Image } from 'react-native';
import PropTypes from 'prop-types';
import playIcon from 'assets/ic_play/ic_play.png';

const Play = ({ onPress, style }) => {
  return (
    <Pressable style={style} onPress={onPress} testID="play-button">
      <Image source={playIcon} />
    </Pressable>
  );
};

export default Play;

Play.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.object,
};

Play.defaultProps = {
  onPress: () => {},
  style: {},
};
