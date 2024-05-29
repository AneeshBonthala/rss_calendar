import React, { useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Calendar from './Calendar';
import axios from 'axios';
import Papa from 'papaparse';

function CalendarWithEvents({sheetURL}) {

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

const exampleSheet = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSwmbCwe3gTsV5x92HyjhFv_qAx9ExWkd_ciFu9bCQ0nX2rdtm0lmuKHtyRFiUAQVMv71xUb1JsSQEh/pub?gid=0&single=true&output=csv";
const actualSheet = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSwmbCwe3gTsV5x92HyjhFv_qAx9ExWkd_ciFu9bCQ0nX2rdtm0lmuKHtyRFiUAQVMv71xUb1JsSQEh/pub?gid=771506514&single=true&output=csv";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <CalendarWithEvents sheetURL = {exampleSheet}/>
    </React.StrictMode>
);