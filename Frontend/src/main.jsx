import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import GoogleOAuthProvider
import store from './redux/store';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="<your_client_id>">
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </GoogleOAuthProvider>
);
