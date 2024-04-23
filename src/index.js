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
- default the scrollbar to start at 8am or other reasonable time
- Limit the number of weeks back/forward user can go
- to potentially view all-day events/tasks, allow user to click on date name

Longer term goals

- Account formation -> only some authorized accounts can add/edit/delete events
- Implement the calendar functionality
	- add event (fields: name, days, all-day/time, description)
		- start time and end time should be in increments of 15 minutes
	- click on event to view fields or edit/delete event
  - handle concurrent events (stack them appropriately and prioritize the one being hovered over)

*/