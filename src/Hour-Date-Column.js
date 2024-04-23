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

function DateColumn({ date, events }) {
    const hours = Array.from(new Array(24), (_, index) => index);

    function Event({ event }) {
      const top = event.startHour * 50; // assuming each hour slot has a height of 50px
      const height = event.duration * 50;
  
      return (
          <div className="event" style={{ top: `${top}px`, height: `${height}px` }}>
              {event.title}
          </div>
      );
    }

    return (
    <div className="date-column">
        {hours.map(hour => (
          <div key={`${date.toString()}-${hour}`} className="date-and-hour-index"></div>
        ))}

        {/* {events.map(event => (
          <Event key={event.id} event={event} />
        ))} */}


    </div>

    );
}

export {
    HourColumn,
    DateColumn
}