import React, { useEffect, useState } from 'react';
import { useColorScheme, ActivityIndicator } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import Center from 'components/Center';
import Navigation from 'navigation';
import { DarkTheme, LightTheme } from 'helpers/Themes';
import { DARK } from 'constants/colorScheme';
import { persistor, store } from 'store';

enableScreens();

function App() {
  const scheme = useColorScheme();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    persistor(() => {
      RNBootSplash.hide();
      setReady(true);
    });
  }, []);

  const loading = (
    <Center>
      <ActivityIndicator />
    </Center>
  );
  const loaded = (
    <Provider store={store}>
      <Navigation theme={scheme === DARK ? DarkTheme : LightTheme} />
    </Provider>
  );

  return ready ? loaded : loading;
}

export default App;
