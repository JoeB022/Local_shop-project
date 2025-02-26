import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <AuthProvider />
    </BrowserRouter>
  </Provider>
);
