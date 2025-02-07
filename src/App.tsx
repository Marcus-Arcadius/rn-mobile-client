// necessary to import this first: https://reactnavigation.org/docs/drawer-navigator/#installation
import 'react-native-gesture-handler';

import nodejs from 'nodejs-mobile-react-native';
import AppLoading from 'expo-app-loading';
import { Host } from 'react-native-portalize';
import Toast from 'react-native-toast-message';

import React from 'react';
import { store } from './store';
import { Provider } from 'react-redux';
import { ListenerContainer } from './ListenerContainer';
import { Navigator } from './Navigator';
import { StatusBar } from 'react-native';
import { getStoredUsernames } from './store/thunks/account';

setTimeout(() => {
  console.log('starting nodejs bundle...');
  nodejs.start('bundle.js');
}, 1);

export default function App() {
  const [isReady, setIsReady] = React.useState(false);

  const startupActions = async () => {
    await store.dispatch(getStoredUsernames());
  };

  React.useEffect(() => {
    startupActions()
      .then(() => {
        setIsReady(true);
      })
      .catch(e => {
        console.log('startup error... should never happen', e);
        setIsReady(true);
      });
  }, []);
  return (
    <Provider store={store}>
      <StatusBar barStyle={'dark-content'} />
      <ListenerContainer />
      {isReady ? (
        <Host>
          <Navigator />
        </Host>
      ) : (
        <AppLoading />
      )}
      <Toast />
    </Provider>
  );
}
