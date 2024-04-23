import { Box } from '@mui/material';

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

    function Event( { event }) {

      function toTimeString(startHour, duration) {
        function decimalToTimeString(decimal) {
          const hours = Math.floor(decimal);
          const minutes = (decimal - hours) * 60;
          const standardHour = hours % 12 === 0 ? 12 : hours % 12;
          const standardMinutes = Math.round(minutes);
          const amPm = hours < 12 ? 'am' : 'pm';
          const paddedMinutes = standardMinutes.toString().padStart(2, '0');
          return `${standardHour}:${paddedMinutes} ${amPm}`;
        }
        const endTime = startHour + duration;
        const startTimeString = decimalToTimeString(startHour);
        const endTimeString = decimalToTimeString(endTime);
        return `${startTimeString} - ${endTimeString}`;
      }

      return (
        <Box
          sx={{
            position: 'absolute',
            width:`90%`,
            height:`${event.duration * 60 * 0.98}px`,
            borderRadius:2,
            bgcolor: event.mainColor,
            '&:hover': {bgcolor: event.hoverColor},
            zIndex: 10
          }}
          onClick={() => {}}
        >
          <div className="event-name">
            {event.title.concat(", ", toTimeString(event.startHour, event.duration))}
          </div>
        </Box>
      )
    }

    return (
    <div className="date-column">
        {hours.map(hour => (
          <div key={`${date.toString()}-${hour}`} className="date-and-hour-box">
            {events.filter(event => event.startHour === hour).map(event => (
              <Event event={event}></Event>
            ))}
          </div>
        ))}
    </div>

    );
}

export {
    HourColumn,
    DateColumn
}