import React, { useState } from 'react';
import { format, startOfWeek, addDays, subDays } from 'date-fns';
import { HourColumn, DateColumn } from './Hour-Date-Column.js'

import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import IconButton from '@mui/material/IconButton'
import AddCircleIcon from '@mui/icons-material/AddCircle';

import './Calendar.css'

function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const weekStart = startOfWeek(currentDate);
    const days = [];
    for (let i = 0; i < 7; i++) {
        days.push(addDays(weekStart, i));
    }

    const exampleEventsForDemo = [
        { date: format(addDays(weekStart, 1), 'yyyy-MM-dd'), startHour: 4, duration: 4, title: "Team Meeting", mainColor: "#007FFF", hoverColor: "#0066CC" },
        { date: format(addDays(weekStart, 4), 'yyyy-MM-dd'), startHour: 7, duration: 2.5, title: "Reading to Kids", mainColor: "#FF8000", hoverColor: "#CC6600" },
        { date: format(addDays(weekStart, 3), 'yyyy-MM-dd'), startHour: 2, duration: 4, title: "Beach Clean Up", mainColor: "#FF0200", hoverColor: "#B70100" },
    ]

    return (
        <div className="calendar">

            <div className="header">
                <div className="arrow-buttons-and-week-name">
                    <div className="arrow-buttons">
                        <IconButton
                            color="inherit"
                            size="large"
                            // disableRipple="True"
                            onClick={() => setCurrentDate(subDays(currentDate, 7))}>
                            <NavigateBeforeIcon fontSize="large"/>
                        </IconButton>
                        <IconButton
                            color="inherit"
                            size="large"
                            // disableRipple="True"
                            onClick={() => setCurrentDate(addDays(currentDate, 7))}>
                            <NavigateNextIcon fontSize="large"/>
                        </IconButton>
                    </div>
                    <div className="week-name">
                        Spring 24 Week Four
                    </div>
                </div>
                <div className="add-event-button">
                    <IconButton
                        color="inherit"
                        size="large">
                        <AddCircleIcon fontSize="large"/>
                    </IconButton>
                </div>
            </div>

            <div className="date-names-row">
                <div/>
                {days.map(date => (
                    <div className="date-name">
                        {format(date, 'EEE MMM d').toString()}
                    </div>
                ))}
                <div/>
            </div>

            <div className="body">
                <HourColumn/>
                {days.map(date => (
                    <DateColumn key={date.toString()} date={date} events={exampleEventsForDemo.filter(event => format(date, 'yyyy-MM-dd') === event.date)} />
                ))}
                {/* scrollbar takes up this space */}
            </div>
        
        </div>
    );
}

export default Calendar;