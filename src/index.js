import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';
import 'modern-normalize/modern-normalize.css';
import './styles/base.scss';

const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import 'modern-normalize/modern-normalize.css';
// import './styles/base.scss';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root'),
// );
