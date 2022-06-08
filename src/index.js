import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import 'modern-normalize/modern-normalize.css';
import App from './App';
import './index.css';

const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
