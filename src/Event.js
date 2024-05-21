import { Box } from '@mui/material';

import './Event.css'

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

export default Event;