import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './api/store';
import { Provider } from 'react-redux';
import { Buffer } from 'buffer';
import process from 'process';

window.Buffer = Buffer;
window.process = process;

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
const root= ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
  <Provider store={store}>
  <App/>
  </Provider>
  </>
)

