import React, { useEffect, useRef, useState } from 'react';
import { addDays, addWeeks, differenceInDays, format, startOfWeek, subDays, subWeeks } from 'date-fns';
import { DateColumn, HourColumn } from './Hour-Date-Column.js'
import { ExpandedEvent, DateOverview } from './Event.js'

import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import IconButton from '@mui/material/IconButton'
// import AddCircleIcon from '@mui/icons-material/AddCircle';

import './Calendar.css'

function Calendar() {

    // Initialize date state
    const [curDate, setCurDate] = useState(new Date());
    const weekStart = startOfWeek(curDate);
    const days = [];
    for (let i = 0; i < 7; i++) {
        days.push(addDays(weekStart, i));
    }

    // Initialize current expanded event state
    const [expandedEventID, setExpandedEventID] = useState(null);
    const expand = (id) => {
        setExpandedEventID(expandedEventID === id ? null : id);
    }

    // Initialize current date overview state
    const [dateInOverview, setDateInOverview] = useState(curDate);
    const setDateInOverviewHelper = (date) => {
        setDateInOverview(date);
        setExpandedEventID(null);
    }

    // On refresh, default calendar scrollbar to start at 8 am, and reset expanded event
    const scrollRef = useRef(null);
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = 60 * 8 - 1;
        }
        setExpandedEventID(null);
    }, [])

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
                onClick = {() => setDateInOverviewHelper(date)}
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
                expandedEventID = {expandedEventID}
                events={exampleEvents}
                expand = {(id) => expand(id)}
            />
        ))}
        {/* scrollbar takes up this space */}
    </div>

    const expandedEvent =
        <ExpandedEvent
                event = {exampleEvents.get(expandedEventID)}
        >
        </ExpandedEvent>

    const dateOverview =
        <DateOverview
            date = {format(dateInOverview, 'EEEE, MMMM d').toString()}
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
                {expandedEventID === null ? dateOverview : expandedEvent}
            </div>
        </div>
    );
}

export default Calendar;

const event1 = {date: format(addDays(startOfWeek(new Date()), 3), 'yyyy-MM-dd'), startHour: 9, duration: 2.5, title: "Team Meeting", mainColor: "#007FFF", hoverColor: "#0066CC", details: "A productive session to discuss projects, set goals, and collaborate on tasks. Share updates and brainstorm ideas with the team." }
const event2 = {date: format(addDays(startOfWeek(new Date()), 3), 'yyyy-MM-dd'), startHour: 10, duration: 4, title: "Reading to Kids", mainColor: "#FF8000", hoverColor: "#CC6600", details: "Enjoy an hour of storytelling to children, fostering their love for books and sparking their imagination."}
const event3 = {date: format(addDays(startOfWeek(new Date()), 2), 'yyyy-MM-dd'), startHour: 14, duration: 3.75, title: "Beach Clean Up", mainColor: "#FF0200", hoverColor: "#B70100", details: "Join us in removing litter from the beach to protect marine life and promote environmental awareness. Make a difference in our coastal ecosystems."}
const exampleEvents = new Map();
exampleEvents.set(1, event1);
exampleEvents.set(2, event2);
exampleEvents.set(3, event3);

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