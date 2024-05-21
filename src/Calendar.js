import React, { useEffect, useRef, useState } from 'react';
import { addDays, addWeeks, differenceInDays, format, isAfter, isBefore, isEqual, startOfWeek, subDays, subWeeks } from 'date-fns';
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
                        onClick={() => setCurDate(subDays(curDate, 7))}>
                        <NavigateBeforeIcon fontSize="large"/>
                    </IconButton>
                    <IconButton
                        color="inherit"
                        size="large"
                        // disableRipple="True"
                        onClick={() => setCurDate(addDays(curDate, 7))}>
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

    // The pattern implemented here only works until 2028-2029 academic year; for some reason, it changes thereafter

    let curYear = curDate.getFullYear();

    const getNthWeekdayOfMonth = function(month, weekday, n) {
        let date = new Date(curYear, month, 1);
        while (date.getDay() !== weekday) {
            date = addDays(date, 1);
        }
        date = addWeeks(date, n-1);
        return date;
    }

    const getNthToLastWeekdayOfMonth = function(month, weekday, n) {
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

    // subDays(1) or addDays(1) is because the calendar week starts on Sunday and start is inclusive and end is exclusive
    
    // Fall Week 0 always starts on 2nd to last Monday in September
    let fallStart = getNthToLastWeekdayOfMonth(8, 1, 2);
    fallStart = subDays(fallStart, 1);
    let fallEnd = new Date(fallStart);
    fallEnd = addWeeks(fallStart, 12);
    
    // Winter starts on laterOf(1st Monday in January, January 4th)
    let winterStart;
    let winterStart1 = getNthWeekdayOfMonth(0, 0, 1);
    let winterStart2 = new Date(curYear, 0, 4);
    if (winterStart1 < winterStart2) {
        while (winterStart2.getDay() !== 6) {
            winterStart2 = subDays(winterStart2, 1);
        }
        winterStart = winterStart2;
    }
    else {
        winterStart = winterStart1;
        winterStart = subDays(winterStart, 1);
    }
    let winterEnd = new Date(winterStart);
    winterEnd = addWeeks(winterEnd, 11);
    
    let springStart = new Date(winterStart);
    springStart = addWeeks(winterStart, 12);
    let springEnd = new Date(springStart);
    springEnd = addWeeks(springEnd, 11);
    
    const quarterDates = new Map([
        ["Fall", [fallStart, fallEnd]],
        ["Winter Break1", [fallEnd, new Date(curYear + 1, 0, 1)]],
        ["Winter Break2", [new Date(curYear, 0, 1), winterStart]],
        ["Winter", [winterStart, winterEnd]],
        ["Spring Break ", [winterEnd, springStart]],
        ["Spring", [springStart, springEnd]],
    ]);

    // Get the current quarter
    let curQuarter, curQuarterStart, set;
    for (let [quarter, [quarterStart, quarterEnd]] of quarterDates) {
        if ((isEqual(curDate, quarterStart) || isAfter(curDate, quarterStart)) && isBefore(curDate, quarterEnd)) {
            curQuarter = quarter;
            console.log(curQuarter);
            curQuarterStart = quarterStart;
            set = true;
        }
    }
    if (!set) {
        return "Summer Break";
    }
    if (["Winter Break1", "Winter Break2", "Spring Break "].includes(curQuarter)) {
        return curQuarter.slice(0, -1);
    }
    const yearSuffix = " " + curYear.toString().slice(-2)
    if (curQuarter === "Fall") {
        if (differenceInDays(curDate, curQuarterStart) < 7)
            return "Fall" + yearSuffix + " Week Zero";
        curQuarterStart = addDays(curQuarterStart, 7);
    }
    const iToWeek = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Finals"]
    for (let i = 0; i < 10; i++) {
        if (differenceInDays(curDate, curQuarterStart) < 7) {
            return curQuarter + yearSuffix + " Week " + iToWeek[i];
        }
        curQuarterStart = addDays(curQuarterStart, 7);
    }
    return curQuarter + yearSuffix + " Finals";

}