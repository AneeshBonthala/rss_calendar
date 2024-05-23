import React, { useState } from 'react';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import './Event.css'


function Event( { id, event, expand }) {

	const eventBox =
		<Box
			sx={{
				cursor: 'pointer',
				position: 'absolute',
				width: `95%`,
				height:`${event.duration * 60 * 0.98}px`,
				borderRadius:2,
				bgcolor: event.mainColor,
				'&:hover': {bgcolor: event.hoverColor, zIndex: 20},
				zIndex: 10,
			}}
			onClick = {() => expand(id)}
		>
			<div className="event-name">
				{event.title.concat(", ", toTimeString(event.startHour, event.duration))}
			</div>
		</Box>

	return (
		<div>{eventBox}</div>
	)
}

function ExpandedEvent( {event} ) {

	const eventBox = 
		<Card
			variant = "outlined"
		>
			<div>{event.title}</div>
		</Card>

	return (
		<div className = "expanded-event">{eventBox}</div>
	)
}

export {
    Event,
    ExpandedEvent
}

// ex. convert (3, 2) to 3:00 am - 5:00 am
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
  const endHour = startHour + duration;
  const startHourString = decimalToTimeString(startHour);
  const endHourString = decimalToTimeString(endHour);
  return `${startHourString} - ${endHourString}`;
}