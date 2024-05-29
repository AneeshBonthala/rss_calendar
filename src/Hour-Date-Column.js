import { Event } from './Event.js'

import './Hour-Date-Column.css'

function HourColumn() {
    const hours = Array.from(new Array(24), (_, index) => index);

    const twelveHourTime = (time) => {
        if (time === 0) {
            return "12 am";
        }
        else if (time === 12) {
            return "12 pm";
        }
        else if (time < 12) {
            return time.toString().concat(" am");
        }
        else {
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

function DateColumn({ date, events, goToDateOverview }) {

  const hours = Array.from(new Array(24), (_, index) => index);

	const eventsNow = (hour) => {
		const eventsNow = new Map();
		for (const [id, event] of events) {
			if (Math.floor(event.startHour) === hour) {
				eventsNow.set(id, event);
			}
		}
		return eventsNow;
	}

	const createEventsNow = (hour) => (
		<div key={`${date.toString()}-${hour}`} className="date-and-hour-box">
			{Array.from(eventsNow(hour).entries()).map(([, event]) => (
				<Event
					event={event}
					goToDateOverview={() => goToDateOverview()}
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