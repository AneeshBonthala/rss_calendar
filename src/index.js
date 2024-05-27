import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Calendar from './Calendar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Calendar />
  </React.StrictMode>
);

/*

- add event (fields: name, days, all-day/time, color, description) | backend
- click on event to view fields or edit/delete event | design card
- handle concurrent events (stack them appropriately and prioritize the one being hovered over)

*/