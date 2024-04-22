import { format } from 'date-fns';
import './DayTimeline.css'

function HoursColumn() {
    const hours = Array.from(new Array(17), (_, index) => index + 7);

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
        <div className="time-column">
        {hours.map(hour => (
            <div key={hour} className="hour">
            <span className="hour-text">{twelveHourTime(hour)}</span>
            </div>
        ))}
        </div>
    );
}

function DayTimeline({ date }) {
    return (
      <div className="dateNames">
        <div className="date">
            {format(date, 'eeee d')}
        </div>
      </div>
    );
}

export default DayTimeline;