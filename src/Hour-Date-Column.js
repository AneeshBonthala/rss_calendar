import { format } from 'date-fns';

import './DayTimeline.css'

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
            {hours.map(hour => (<div key={hour} className="hour">{twelveHourTime(hour)}</div>
        ))}
        </div>
    );
}

function DateColumn({ date }) {
    const hours = Array.from(new Array(24), (_, index) => index);

    return (
    <div className="date-column">
        {hours.map(hour => (<div key={`${date.toString()}-${hour}`} className="date-and-hour-index"></div>))}
    </div>
    );
}

export {
    HourColumn,
    DateColumn
}