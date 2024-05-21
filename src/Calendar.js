import React, { useEffect, useRef, useState } from 'react';
import { addDays, addWeeks, differenceInDays, format, startOfWeek, subDays, subWeeks } from 'date-fns';
import { DateColumn, HourColumn } from './Hour-Date-Column.js'

import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import IconButton from '@mui/material/IconButton'
import AddCircleIcon from '@mui/icons-material/AddCircle';

import './Calendar.css'

function Calendar() {
    const [curDate, setCurDate] = useState(new Date());
    const weekStart = startOfWeek(curDate);
    const days = [];
    for (let i = 0; i < 7; i++) {
        days.push(addDays(weekStart, i));
    }

    function setCurDateHelper(forward) {
        if (!forward && curDate >= new Date(2024, 0, 13)) {
            setCurDate(subWeeks(curDate, 1));
        }
        else if (forward && curDate < new Date(2028, 5, 4)) {
            setCurDate(addWeeks(curDate, 1));
        }
    }

    /** The following section is included so that the calendar scrollbar defaults to start at 8 am */
    const scrollRef = useRef(null);
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = 60 * 8 - 1;
        }
    })

    const exampleEventsForDemo = [
        { date: '2024-04-22', startHour: 9, duration: 4, title: "Team Meeting", mainColor: "#007FFF", hoverColor: "#0066CC" },
        { date: '2024-04-24', startHour: 11, duration: 2.5, title: "Reading to Kids", mainColor: "#FF8000", hoverColor: "#CC6600" },
        { date: '2024-04-25', startHour: 14, duration: 3.75, title: "Beach Clean Up", mainColor: "#FF0200", hoverColor: "#B70100" },
    ]

    return (
        <div className="calendar">

            <div className="header">
                <div className="arrow-buttons">
                    <IconButton
                        color="inherit"
                        size="large"
                        // disableRipple="True"
                        onClick={() => setCurDateHelper(false)}>
                        <NavigateBeforeIcon fontSize="large"/>
                    </IconButton>
                    <IconButton
                        color="inherit"
                        size="large"
                        // disableRipple="True"
                        onClick={() => setCurDateHelper(true)}>
                        <NavigateNextIcon fontSize="large"/>
                    </IconButton>
                </div>
                <div className="week-name">
                    {getWeekName(weekStart)}
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

    // The pattern implemented here only supports Winter 24 through Spring 28 (inclusive)

    let curYear = curDate.getFullYear();

    function getNthWeekdayOfMonth(month, weekday, n) {
        let date = new Date(curYear, month, 1);
        while (date.getDay() !== weekday) {
            date = addDays(date, 1);
        }
        date = addWeeks(date, n-1);
        return date;
    }

    function getNthToLastWeekdayOfMonth(month, weekday, n) {
        if (month === "December") {
            curYear += 1;
        }
        let date = new Date(curYear, month+1, 1);
        date = subDays(date, 1);
        while (date.getDay() !== weekday) {
            date = subDays(date, 1);
        }
        date = subWeeks(date, n-1);
        return date;
    }

    function getSundayBefore(date) {
        while (date.getDay() !== 0) {
            date = subDays(date, 1);
        }
        return date;
    }

    // Calendar week starts on sunday (inclusive) and ends on the next sunday (exclusive)
    
    // Fall Week 0 starts on 2nd to last Monday in September
    const fallStart = getSundayBefore(getNthToLastWeekdayOfMonth(8, 1, 2));
    const fallEnd = addWeeks(fallStart, 12);

    // Winter Week 1 starts on laterOf(1st Monday in January, January 4th)
    const fst = getSundayBefore(getNthWeekdayOfMonth(0, 0, 1));
    const snd = getSundayBefore(new Date(curYear, 0, 4));
    const winterStart = fst < snd ? snd : fst;
    const winterEnd = addWeeks(winterStart, 11);

    const springStart = addWeeks(winterStart, 12);
    const springEnd = addWeeks(springStart, 11);
    
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