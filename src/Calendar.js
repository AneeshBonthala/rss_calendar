import React, { useState } from 'react';
import { format, startOfWeek, endOfWeek, addDays, subDays } from 'date-fns';
import './Calendar.css'
import { HoursColumn, DayTimeline } from './DayTimeline.js'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import IconButton from '@mui/material/IconButton'
import AddCircleIcon from '@mui/icons-material/AddCircle';

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
                <div className="quarterWeek">
                    Spring 24 Week 4
                </div>
                <div className="addButton">
                    <IconButton
                        color="inherit"
                        size="large">
                        <AddCircleIcon fontSize="large"/>
                    </IconButton>
                </div>
                
            </div>

            <div className="dateHeader">
                <div/>
                {days.map(date => (<div className="dateHeaderElement">{format(date, 'EEE MMM d').toString()}</div>))}
                <div/>
            </div>

            <div className="body">
                <HoursColumn/>
                {days.map(date => (<DayTimeline key={date.toString()} date={date} />))}
                {/* scrollbar takes up this space */}
            </div>
        
        </div>
    );
}

export default Calendar;