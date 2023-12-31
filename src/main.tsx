import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx';

import { Provider } from 'react-redux';
import { persistor, store} from './store/store.tsx';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <App />
      </Provider>
    </PersistGate>
  </React.StrictMode>
)
