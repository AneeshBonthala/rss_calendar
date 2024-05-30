import React from 'react';
import ReactDOM from 'react-dom/client';
import RSSCalendar from './RSSCalendar.js';

const exampleSheet = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSwmbCwe3gTsV5x92HyjhFv_qAx9ExWkd_ciFu9bCQ0nX2rdtm0lmuKHtyRFiUAQVMv71xUb1JsSQEh/pub?gid=0&single=true&output=csv";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RSSCalendar sheetURL = {exampleSheet}/>
    </React.StrictMode>
);