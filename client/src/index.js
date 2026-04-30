import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // Kyunki tera App.js pages folder mein hai

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);