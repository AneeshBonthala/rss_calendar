import React, { useEffect, useRef, useState } from 'react';
import { addDays, addWeeks, differenceInDays, format, startOfWeek, subDays, subWeeks } from 'date-fns';
import { DateColumn, HourColumn } from './Hour-Date-Column.js'

import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import IconButton from '@mui/material/IconButton'
// import AddCircleIcon from '@mui/icons-material/AddCircle';

import './Calendar.css'

function Calendar() {
    const [curDate, setCurDate] = useState(new Date());
    const weekStart = startOfWeek(curDate);
    const days = [];
    for (let i = 0; i < 7; i++) {
        days.push(addDays(weekStart, i));
    }

    // The following section is included so that the calendar scrollbar defaults to start at 8 am
    const scrollRef = useRef(null);
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = 60 * 8 - 1;
        }
    })

    const exampleEventsForDemo = [
        { date: format(addDays(weekStart, 3), 'yyyy-MM-dd'), startHour: 9, duration: 4, title: "Team Meeting", mainColor: "#007FFF", hoverColor: "#0066CC" },
        { date: format(addDays(weekStart, 4), 'yyyy-MM-dd'), startHour: 11, duration: 2.5, title: "Reading to Kids", mainColor: "#FF8000", hoverColor: "#CC6600" },
        { date: format(addDays(weekStart, 2), 'yyyy-MM-dd'), startHour: 14, duration: 3.75, title: "Beach Clean Up", mainColor: "#FF0200", hoverColor: "#B70100" },
    ]

    return (
        <div className="calendar">

            <div className="header">
                <div className="arrow-buttons">
                    <IconButton
                        color="inherit"
                        size="large"
                        // disableRipple="True"
                        onClick={() => setCurDate(subWeeks(curDate, 1))}>
                        <NavigateBeforeIcon fontSize="large"/>
                    </IconButton>
                    <IconButton
                        color="inherit"
                        size="large"
                        // disableRipple="True"
                        onClick={() => setCurDate(addWeeks(curDate, 1))}>
                        <NavigateNextIcon fontSize="large"/>
                    </IconButton>
                </div>
                <div className="week-name">
                    {getWeekName(weekStart)}
                </div>
                {/* <div className="add-event-button">
                    <IconButton
                        color="inherit"
                        size="large">
                        <AddCircleIcon fontSize="large"/>
                    </IconButton>
                </div> */}
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

            <div className="body" ref={scrollRef}>
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

function getWeekName(curDate) {

    let curYear = curDate.getFullYear();

    function getNthWeekdayOfMonth(year, month, weekday, n) {
        let date = new Date(year, month, 1);
        while (date.getDay() !== weekday) {
            date = addDays(date, 1);
        }
        date = addWeeks(date, n-1);
        return date;
    }

    function getSundayBefore(date) {
        while (date.getDay() !== 0) {
            date = subDays(date, 1);
        }
        return date;
    }

    // Calendar week starts on sunday (inclusive) and ends on the next sunday (exclusive)

    // The fixed reference point seems to be the start of winter quarter, which is laterOf(1st Monday in January, January 4th)
    const fst = getSundayBefore(getNthWeekdayOfMonth(curYear, 0, 0, 1));
    const snd = getSundayBefore(new Date(curYear, 0, 4));
    const winterStart = fst < snd ? snd : fst;
    const winterEnd = addWeeks(winterStart, 11);

    const springStart = addWeeks(winterEnd, 1);
    const springEnd = addWeeks(springStart, 11);
    
    // To find fall start date, we need to find the start date of next year's winter quarter and go back 15 weeks
    const nextFst = getSundayBefore(getNthWeekdayOfMonth(curYear+1, 0, 0, 1));
    const nextSnd = getSundayBefore(new Date(curYear+1, 0, 4));
    const nextWinterStart = nextFst < nextSnd ? nextSnd : nextFst;
    const fallStart = subWeeks(nextWinterStart, 15);
    const fallEnd = addWeeks(fallStart, 12);
    
    const quarterDates = [
        ["Fall", fallStart, fallEnd],
        ["Winter Break", fallEnd, new Date(curYear + 1, 0, 1)],
        ["Winter Break", new Date(curYear, 0, 1), winterStart],
        ["Winter", winterStart, winterEnd],
        ["Spring Break ", winterEnd, springStart],
        ["Spring", springStart, springEnd],
    ];

    // Get the current quarter
    let curQuarter, curQuarterStart;
    for (let [quarter, quarterStart, quarterEnd] of quarterDates) {
        if (curDate >= quarterStart && curDate < quarterEnd) {
            curQuarter = quarter;
            curQuarterStart = quarterStart;
        }
    }

    // Return the week name
    if (curQuarter === undefined) {
        return "Summer Break";
    }
    if (["Winter Break", "Spring Break"].includes(curQuarter)) {
        return curQuarter;
    }
    const yearSuffix = " " + curYear.toString().slice(-2)
    if (curQuarter === "Fall") {
        if (differenceInDays(curDate, curQuarterStart) < 7)
            return "Fall" + yearSuffix + " Week Zero";
        curQuarterStart = addDays(curQuarterStart, 7);
    }
    const iToWeek = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"]
    for (let i = 0; i < 10; i++) {
        if (differenceInDays(curDate, curQuarterStart) < 7) {
            return curQuarter + yearSuffix + " Week " + iToWeek[i];
        }
        curQuarterStart = addDays(curQuarterStart, 7);
    }
    return curQuarter + yearSuffix + " Finals";

}