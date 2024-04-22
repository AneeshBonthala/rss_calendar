import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import Calendar from './Calendar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Calendar />
  </React.StrictMode>
);
