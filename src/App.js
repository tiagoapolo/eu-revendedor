import React from 'react';
import './App.scss';
import Routes from './routes/Routes';
import { Provider } from 'react-redux';
import { Store } from './store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={Store}>
      <Routes />
      <ToastContainer autoClose={1500}/>
    </Provider>
  )
}

export default App;
