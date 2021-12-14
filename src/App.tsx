import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './redux/store';
import SplashScreen from './components/SplashScreen';
import {AppNavigator} from './navigations/index';
function App() {
  // const authState = useSelector<RootState>(state => state?.auth?.isLoggedIn);
  const [state, setState] = useState<boolean>(false);

  useEffect(() => {
    const handle = setTimeout(() => {
      setState(true);
    }, 2000);
    return () => clearTimeout(handle);
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {state ? <AppNavigator /> : <SplashScreen />}
      </PersistGate>
    </Provider>
  );
}

export default App;
