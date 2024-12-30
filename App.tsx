// App.js
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import StackNav from './src/navigation/stackNav';
import store, { persistor } from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StackNav />
      </PersistGate>
    </Provider>
  );
};

export default App;
