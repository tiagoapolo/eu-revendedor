import React from 'react';
import './App.scss';
import Routes from './routes/Routes';
import { Provider } from 'react-redux';
import { Store } from './store';


function App() {
  return (
    <Provider store={Store}>
      <Routes />
    </Provider>
  )
}

export default App;
