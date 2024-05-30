import React, { useEffect, useState, useCallback } from 'react';
import './RSSCalendar.css';
import Calendar from './Calendar';
import axios from 'axios';
import Papa from 'papaparse';

function RSSCalendar({sheetURL}) {

    const [events, setEvents] = useState(new Map());

    const fetchEvents = useCallback(async (sheetURL) => {
        const response = await axios.get(sheetURL);
        const csvData = response.data;
        const parsedData = Papa.parse(csvData, {header: true});
        const events = new Map();
        parsedData.data.forEach((event, index) => {
            events.set(index, {
                ...event,
                startHour: parseFloat(event.startHour),
                duration: parseFloat(event.duration)
            }); 
        });
        return events;
    }, []);

    useEffect(() => {
        const loadEvents = async () => {
            const events = await fetchEvents(sheetURL);
            setEvents(events);
        };
        loadEvents();
    }, [sheetURL, fetchEvents]);

    return (
        <Calendar events={events}/>
    )
}

export default RSSCalendar;