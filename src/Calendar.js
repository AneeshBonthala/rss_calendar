import React, { useState } from 'react';
import { format, startOfWeek, endOfWeek, addDays, subDays } from 'date-fns';
import './Calendar.css'
import DayTimeline from './DayTimeline.js'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Button from '@mui/material/Button'

function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());

    const weekStart = startOfWeek(currentDate);
    const weekEnd = endOfWeek(currentDate);

    const monthOfWeekStart = format(weekStart, 'MMMM');
    const monthOfWeekEnd = format(weekEnd, 'MMMM');
    const month = (monthOfWeekStart === monthOfWeekEnd ? monthOfWeekStart : monthOfWeekStart.concat("-", monthOfWeekEnd));

    const days = [];

    for (let i = 0; i < 7; i++) {
        days.push(addDays(weekStart, i));
    }

    return (
        <div className="calendar">

            <div className="header">
                <div className="prevAndNext">
                    <Button
                        color="inherit"
                        onClick={() => setCurrentDate(subDays(currentDate, 7))}>
                        <NavigateBeforeIcon fontSize="large"/>
                    </Button>
                    <Button
                        color="inherit"
                        onClick={() => setCurrentDate(addDays(currentDate, 7))}>
                        <NavigateNextIcon fontSize="large"/>
                    </Button>
                </div>
                <div className = "monthName">{month}</div>
            </div>

            <div className="body">
                {days.map(date => (<DayTimeline key={date.toString()} date={date} />))}
            </div>
        
        </div>
    );
}

export default Calendar;