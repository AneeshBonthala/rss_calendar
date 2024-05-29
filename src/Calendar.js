import React, { useEffect, useRef, useState } from 'react';
import { addDays, addWeeks, differenceInDays, format, startOfWeek, subDays, subWeeks } from 'date-fns';
import { DateColumn, HourColumn } from './Hour-Date-Column.js'
import { DateOverview } from './Event.js'

import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import IconButton from '@mui/material/IconButton'
// import AddCircleIcon from '@mui/icons-material/AddCircle';

import './Calendar.css'

function Calendar({events}) {

    // Initialize date state
    const [curDate, setCurDate] = useState(new Date());
    const weekStart = startOfWeek(curDate);
    const days = [];
    for (let i = 0; i < 7; i++) {
        days.push(addDays(weekStart, i));
    }

    // Initialize current date overview state
    const [dateInOverview, setDateInOverview] = useState(curDate);

    // On refresh, default calendar scrollbar to right above earliest event of the week, and to today's date on sidebar
    const scrollRef = useRef(null);
    useEffect(() => {
        if (scrollRef.current) {
            let earliestStart = 11;
            let date = weekStart;
            for (let i = 0; i < 7; i += 1) {
                for (let [, event] of daysEvents(date)) {
                    console.log(event.startHour);
                    if (event.startHour < earliestStart && event.startHour >= 5) {
                        earliestStart = event.startHour;
                    }
                }
                date = addDays(date, 1);
            }
            console.log(earliestStart);
            scrollRef.current.scrollTop = 60 * Math.floor(earliestStart - 1) - 1;
        }
        setDateInOverview(new Date());
    }, [])

    // Only get one day's events
    function daysEvents(date) {
        const eventsToday = new Map();
        for (const [id, event] of events) {
            if (event.date === format(date, 'yyyy-MM-dd')) {
                eventsToday.set(id, event);
            }
        }
        return eventsToday;
    }

    const header =
    <div className="header">
        <div className="arrow-buttons">
            <IconButton
                color="inherit"
                size="large"
                onClick={() => setCurDate(subWeeks(curDate, 1))}>
                <NavigateBeforeIcon fontSize="large"/>
            </IconButton>
            <IconButton
                color="inherit"
                size="large"
                onClick={() => setCurDate(addWeeks(curDate, 1))}>
                <NavigateNextIcon fontSize="large"/>
            </IconButton>
        </div>
        <div className="week-name">
            {getWeekName(weekStart)}
        </div>
    </div>

    const dateNamesRow =
    <div className="date-names-row">
        <div/>
        {days.map(date => (
            <div className="date-name"
                onClick = {() => setDateInOverview(date)}
            >
                {format(date, 'EEE MMM d').toString()}
            </div>
        ))}
        <div/>
    </div>

    const body =
    <div className="body" ref={scrollRef}>
        <HourColumn/>
        {days.map(date => (
            <DateColumn
                key={date.toString()}
                date={date}
                events={daysEvents(date)}
                goToDateOverview = {() => setDateInOverview(date)}
            />
        ))}
        {/* scrollbar takes up this space */}
    </div>

    const dateOverview =
        <DateOverview
            day = {format(dateInOverview, 'EEEE,').toString()}
            date = {format(dateInOverview, 'MMMM d').toString()}
            events = {Array.from(daysEvents(dateInOverview).values())}
        >
        </DateOverview>

    return (
        <div className="calendar">
            <div className="main">
                {header}
                {dateNamesRow}
                {body}
            </div>
            <div className="sidebar">
                <div className="sidebar-main">
                    {dateOverview}
                </div>
                <div className="sidebar-scroll"></div>
            </div>
        </div>
    );
}

export default Calendar;

// ex. convert week of 'Sun May 19' - 'Sat May 25' to 'Spring 24 Week Eight'

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
    const nextFst = getSundayBefore(getNthWeekdayOfMonth(curYear + 1, 0, 0, 1));
    const nextSnd = getSundayBefore(new Date(curYear + 1, 0, 4));
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