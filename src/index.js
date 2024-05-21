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

Short term goals

- Match calendar weeks with quarter and week numbers (i.e. apr28-may4 == Spring 24 Week Five)
- Limit the number of weeks back/forward user can go (perhaps limit to current quarter)
- make scrollbar start at min(8am, earliest event start time)
- to potentially view all-day events/tasks, allow user to click on date name

Longer term goals

- Account formation -> only some authorized accounts can add/edit/delete events
- Implement the calendar functionality
	- add event (fields: name, days, all-day/time, color, description)
	- click on event to view fields or edit/delete event
  - handle concurrent events (stack them appropriately and prioritize the one being hovered over)

*/