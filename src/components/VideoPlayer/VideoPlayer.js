import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import { ActivityIndicator, View } from 'react-native';
import PropTypes from 'prop-types';
import { useTheme } from '@react-navigation/native';
import getStyles from './styles';
import Center from 'components/Center';

const VideoPlayer = ({ route }) => {
  const { uri } = route.params;
  const [isLoading, setIsloading] = useState(true);
  const styles = getStyles(useTheme(), isLoading);
  const onLoadFinished = () => {
    setIsloading(false);
  };

  return (
    <>
      {isLoading && (
        <Center style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="black" animating />
        </Center>
      )}
      <View style={styles.webView}>
        <WebView on onLoadEnd={onLoadFinished} source={{ uri }} />
      </View>
    </>
  );
};

export default VideoPlayer;

VideoPlayer.propTypes = {
  route: PropTypes.object,
  uri: PropTypes.string,
};

VideoPlayer.defaultProps = {
  route: {},
  uri: '',
};
