import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Calendar from './Calendar';

const event1 = {date: '2024-05-30', title: "The Gothic Gala: A Tribute to Gothic Culture", startHour: 19, duration: 2, location: "The Hill (TBD)", link: "https://rssla.us9.list-manage.com/track/click?u=dcf9ce4b920d34e2f3744d01c&id=96530cdcbb&e=6ebf9c8d20", color: "#007FFF", details: "Take a break from finals and come to the Gothic Gala Extravaganza for an entertainment, fashion, and creativity-filled evening! Activities include a movie, nail painting, photoshoots, and more!\nOf course, please come dressed in Goth fashion (try your best to)! Let us know you're coming by RSVPing here.\nPlease email Kenneth at transfers@rssla.org with any questions." }
const event2 = {date: '2024-05-31', title: "Spring Fundrager", startHour: 22, duration: 2, location: "Location Emailed to RSVPs", link: "https://rssla.us9.list-manage.com/track/click?u=dcf9ce4b920d34e2f3744d01c&id=68f9c3cc42&e=6ebf9c8d20", color: "#FF8000", details: "Come join us for a party to end the year strong! Our Funding Committee will be hosting a fun night for RSSers (and their non-RSS friends).  There will be an $8 presale entrance fee if you RSVP here or $10 if you pay at the door. Presale will close on May 30th! You can pay through our Venmo @uclafundragerss.\nPlease email Kavya at treasurer@rssla.org with any questions."}
const event3 = {date: '2024-06-01', title: "Spring Fundrager", startHour: 0, duration: 2, location: "Location Emailed to RSVPs", link: "https://rssla.us9.list-manage.com/track/click?u=dcf9ce4b920d34e2f3744d01c&id=68f9c3cc42&e=6ebf9c8d20", color: "#FF8000", details: "Come join us for a party to end the year strong! Our Funding Committee will be hosting a fun night for RSSers (and their non-RSS friends).  There will be an $8 presale entrance fee if you RSVP here or $10 if you pay at the door. Presale will close on May 30th! You can pay through our Venmo @uclafundragerss.\nPlease email Kavya at treasurer@rssla.org with any questions."}
const exampleEvents = new Map();
exampleEvents.set(1, event1);
exampleEvents.set(2, event2);
exampleEvents.set(3, event3);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Calendar events={exampleEvents}/>
    </React.StrictMode>
);

/*

- add event (fields: name, days, time, link, color, description) | backend
    - parse multi-day events into broken up pieces per day
    - time == -1 for all day events (not shown on calendar but only on sidebar)
- handle concurrent events (stack them appropriately and prioritize the one being hovered over)


*/