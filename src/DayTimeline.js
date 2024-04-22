import { format } from 'date-fns';
import './DayTimeline.css'

function HoursColumn() {

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
        <div className="hoursColumn">
            {hours.map(hour => (<div key={hour} className="hourRow">{twelveHourTime(hour)}</div>
        ))}
        </div>
    );
}

function DayTimeline({ date }) {

    const hours = Array.from(new Array(24), (_, index) => index);

    return (
    <div className="dateColumn">
        {hours.map(hour => (<div key={`${date.toString()}-${hour}`} className="dateRow"></div>))}
    </div>
    );
}

export {
    HoursColumn,
    DayTimeline
}