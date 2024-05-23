import { Event } from './Event.js'
import { format } from 'date-fns';

import './Hour-Date-Column.css'

function HourColumn() {
    const hours = Array.from(new Array(24), (_, index) => index);

    const twelveHourTime = (time) => {
        if (time === 0) {
          return "12 am";
        } else if (time === 12) {
          return "12 pm";
        } else if (time < 12) {
          return time.toString().concat(" am");
        } else {
          return (time - 12).toString().concat(" pm");
        }
    };

    return (
        <div className="hours-column">
            {hours.map(hour => (
              <div key={hour} className="hour">
                {twelveHourTime(hour)}
              </div>))}
        </div>
    );
}

function DateColumn({ date, events, expand }) {

    const hours = Array.from(new Array(24), (_, index) => index);

	// Only get today's events
	const eventsToday = new Map();
	for (const [id, event] of events) {
		if (event.date === format(date, 'yyyy-MM-dd')) {
			eventsToday.set(id, event);
		}
	}

	const eventsNow = (hour) => {
		const eventsNow = new Map();
		for (const [id, event] of eventsToday) {
			if (event.startHour === hour) {
				eventsNow.set(id, event);
				eventsToday.delete(id);
			}
		}
		return eventsNow;
	}

	const createEventsNow = (hour) => (
		<div key={`${date.toString()}-${hour}`} className="date-and-hour-box">
			{Array.from(eventsNow(hour).entries()).map(([id, event]) => (
				<Event
					id = {id}
					event={event}
					expand={(id) => expand(id)}
				></Event>
			))}
		</div>
	)

	// Map every hour box to events that start on that hour
    return (
      	<div className="date-column">
        	{hours.map(hour => (createEventsNow(hour)))}
    	</div>
    );
}

export {
    HourColumn,
    DateColumn
}