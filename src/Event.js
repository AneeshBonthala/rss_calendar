import React from 'react';
import { Box } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlaceIcon from '@mui/icons-material/Place';
import LinkIcon from '@mui/icons-material/Link';
import Linkify from 'react-linkify';

import './Event.css'


function Event({event, goToDateOverview}) {

	const eventBox =
		<Box
			sx={{
				cursor: 'pointer',
				position: 'absolute',
				width: `95%`,
				top: `${(event.startHour - Math.floor(event.startHour)) * 60}px`,
				height:`${event.duration * 60 - 7}px`,
				overflow: 'hidden',
				borderRadius:2,
				bgcolor: event.color,
				'&:hover': {bgcolor: darkenHexColor(event.color), zIndex: 20},
				zIndex: 10,
				border: '1px solid black',
			}}
			onClick = {() => goToDateOverview()}
		>
			<div className="event-name">
				{event.title.concat(", ", convertTimeRange(event.startHour, event.duration))}
			</div>
		</Box>

	return (
		<div>{eventBox}</div>
	)
}

function DateOverview({day, date, events}) {

	events.sort((a,b) => a.startHour - b.startHour);

	const time = (event) => (
		event.startHour === -1 ? null :
		<div className="time">
				<AccessTimeIcon sx={{ width: 20, height: 20, position: 'relative', top: `4px`, marginRight: 0.5}}/>
				{" " + convertTimeRange(event.startHour, event.duration)}
		</div>
	);

	const location = (event) => (
		event.location === "" ? null :
		<div className="location">
			<PlaceIcon sx={{ width: 20, height: 20, position: 'relative', top: `4px`, marginRight: 0.5}}/>
			{event.location}
		</div>
	)

	const link = (event) => (
		event.link === "" ? null :
		<div className="location">
			<LinkIcon sx={{ width: 20, height: 20, position: 'relative', top: `4px`, marginRight: 0.5}}/>
			<a href={event.link}>Sign up</a>
		</div>
	)

	const eventDetails = (event) => (
		<div className="event-details">
			<div className="title">
				{event.title}
			</div>
			{time(event)}
			{location(event)}
			{link(event)}
			<div className="details">
				<Linkify>{event.details}</Linkify>
			</div>
			<br/>
		</div>
	);

	return (
		<div className = "date-overview">
			<div className = "date-title">
				{day}
				<br/>
				{date}
			</div>
			{events.map(event => eventDetails(event))}
		</div>
	)
}

export {
    Event,
	DateOverview
}

// ex. convert (3, 2) to 3:00 am - 5:00 am
function formatTime(hour, minutes = 0) {
	let period = 'am';
	if (hour >= 12) {
	  period = 'pm';
	}
	hour = hour % 12;
	if (hour === 0) {
	  hour = 12;
	}
	return `${hour}:${minutes.toString().padStart(2, '0')} ${period}`;
  }
  
function convertTimeRange(startHour, duration) {
	const startTotalMinutes = startHour * 60;
	const startHourInt = Math.floor(startTotalMinutes / 60);
	const startMinutes = Math.round(startTotalMinutes % 60);
	const endTotalMinutes = startTotalMinutes + duration * 60;
	const endHourInt = Math.floor(endTotalMinutes / 60) % 24;
	const endMinutes = Math.round(endTotalMinutes % 60);
	const startFormatted = formatTime(startHourInt, startMinutes);
	const endFormatted = formatTime(endHourInt, endMinutes);
	return `${startFormatted} - ${endFormatted}`;
}

// darken a hex color for hovering over events
function darkenHexColor(hex, amount = 0.2) {
	if (hex.startsWith('#')) {
	  hex = hex.slice(1);
	}
	let r = parseInt(hex.slice(0, 2), 16);
	let g = parseInt(hex.slice(2, 4), 16);
	let b = parseInt(hex.slice(4, 6), 16);
	r = Math.max(0, Math.min(255, Math.floor(r * (1 - amount))));
	g = Math.max(0, Math.min(255, Math.floor(g * (1 - amount))));
	b = Math.max(0, Math.min(255, Math.floor(b * (1 - amount))));
	const darkenedHex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
	return darkenedHex;
}