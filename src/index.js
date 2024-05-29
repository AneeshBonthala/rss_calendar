import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Calendar from './Calendar';

const event1 = {
    date: '2024-05-30',
    title: "The Gothic Gala: A Tribute to Gothic Culture",
    startHour: 19,
    duration: 2,
    location: "The Hill (TBD)",
    link: "https://rssla.us9.list-manage.com/track/click?u=dcf9ce4b920d34e2f3744d01c&id=96530cdcbb&e=6ebf9c8d20",
    color: "#007FFF",
    details: "Take a break from finals and come to the Gothic Gala Extravaganza for an entertainment, fashion, and creativity-filled evening! Activities include a movie, nail painting, photoshoots, and more!\nOf course, please come dressed in Goth fashion (try your best to)! Let us know you're coming by RSVPing here.\nPlease email Kenneth at transfers@rssla.org with any questions."
};

const event2 = {
    date: '2024-05-31',
    title: "Spring Fundrager",
    startHour: 22,
    duration: 2,
    location: "Location Emailed to RSVPs",
    link: "https://rssla.us9.list-manage.com/track/click?u=dcf9ce4b920d34e2f3744d01c&id=68f9c3cc42&e=6ebf9c8d20",
    color: "#FF8000",
    details: "Come join us for a party to end the year strong! Our Funding Committee will be hosting a fun night for RSSers (and their non-RSS friends).  There will be an $8 presale entrance fee if you RSVP here or $10 if you pay at the door. Presale will close on May 30th! You can pay through our Venmo @uclafundragerss.\nPlease email Kavya at treasurer@rssla.org with any questions."
};

const event3 = {
    date: '2024-06-01',
    title: "Spring Fundrager",
    startHour: 0,
    duration: 2,
    location: "Location Emailed to RSVPs",
    link: "https://rssla.us9.list-manage.com/track/click?u=dcf9ce4b920d34e2f3744d01c&id=68f9c3cc42&e=6ebf9c8d20",
    color: "#FF8000",
    details: "Come join us for a party to end the year strong! Our Funding Committee will be hosting a fun night for RSSers (and their non-RSS friends).  There will be an $8 presale entrance fee if you RSVP here or $10 if you pay at the door. Presale will close on May 30th! You can pay through our Venmo @uclafundragerss.\nPlease email Kavya at treasurer@rssla.org with any questions."
};

const event4 = {
    date: '2024-05-26',
    title: "Outdoor Yoga Session",
    startHour: 12,
    duration: 1.25,
    location: "Central Park",
    link: "https://yogaevents.com/session/26may",
    color: "#00FF7F",
    details: "Join us for a refreshing morning yoga session at Central Park. Open to all levels. Please bring your own mat. This session is designed to help you unwind and find your inner peace. The tranquil environment of Central Park will enhance your yoga experience. Don't miss this chance to rejuvenate your mind and body while surrounded by nature's beauty. Participants are encouraged to arrive early to settle in and enjoy some light stretching before the session begins. Water and light snacks will be provided after the session. Connect with like-minded individuals and make new friends at this community event."
  };
  
  const event5 = {
    date: '2024-05-27',
    title: "Coding Bootcamp",
    startHour: 14.5,
    duration: 3,
    location: "TechHub Downtown",
    link: "https://codingbootcamp.com/event/27may",
    color: "#8A2BE2",
    details: "A hands-on coding bootcamp for beginners. Learn the basics of web development. This bootcamp will cover essential topics such as HTML, CSS, and JavaScript. Participants will engage in interactive coding exercises and projects to reinforce their learning. No prior coding experience is required. Our experienced instructors will guide you through each step, ensuring you gain a solid foundation in web development. By the end of the bootcamp, you will have created your own website. Join us for an intensive and rewarding learning experience that could kickstart your career in tech. Networking opportunities with industry professionals will also be available."
  };
  
  const event6 = {
    date: '2024-05-28',
    title: "Community Cleanup",
    startHour: -1,
    duration: 6,
    location: "City Park",
    link: "https://communityevents.com/cleanup/28may",
    color: "#FF4500",
    details: "Join us for a community cleanup day at City Park. All supplies will be provided. This event aims to bring together community members to help clean and beautify our local park. Volunteers will be provided with gloves, trash bags, and other necessary supplies. This is a great opportunity to give back to the community and make a positive impact on the environment. Participants are encouraged to wear comfortable clothing and sturdy shoes. Light refreshments will be available throughout the day. Let's work together to keep our park clean and green. Families and groups are welcome. Every little bit helps!"
  };
  
  const event7 = {
    date: '2024-05-29',
    title: "Art Exhibition",
    startHour: 10,
    duration: 4,
    location: "Downtown Gallery",
    link: "https://artexhibition.com/event/29may",
    color: "#FFD700",
    details: "Explore the latest art installations by local artists at the Downtown Gallery. This exhibition features a diverse range of artworks, including paintings, sculptures, and digital art. Each piece tells a unique story and showcases the talent and creativity of our local art community. Visitors will have the opportunity to meet some of the artists and learn more about their inspiration and creative process. The exhibition is open to all ages and is a great way to support local artists. Refreshments will be served, and there will be interactive activities for children. Don't miss this chance to experience art in a vibrant and welcoming environment."
  };
  
  const event8 = {
    date: '2024-05-30',
    title: "Cooking Workshop",
    startHour: 15.5,
    duration: 2.25,
    location: "Community Center Kitchen",
    link: "https://cookingworkshop.com/event/30may",
    color: "#FF69B4",
    details: "Learn to cook delicious meals with our expert chefs. All ingredients provided. This hands-on workshop will teach you how to prepare a variety of dishes, from appetizers to desserts. Participants will receive step-by-step instructions and tips on cooking techniques. Whether you're a beginner or an experienced cook, you'll gain new skills and confidence in the kitchen. At the end of the workshop, enjoy the fruits of your labor with a group tasting session. Recipes and a cooking certificate will be provided to all participants. Bring your enthusiasm and appetite for a fun and educational culinary experience. Limited spots available, so sign up early!"
  };
  
  const event9 = {
    date: '2024-05-31',
    title: "Music Concert",
    startHour: 10,
    duration: 3,
    location: "City Arena",
    link: "https://musicconcert.com/event/31may",
    color: "#1E90FF",
    details: "Enjoy live performances by top bands at the City Arena. This concert will feature a lineup of talented musicians across various genres, including rock, pop, and jazz. It's a perfect event for music lovers of all ages. The arena will be equipped with state-of-the-art sound and lighting systems to enhance your concert experience. Food and beverages will be available for purchase. Bring your friends and family for a night of unforgettable music and entertainment. Merchandise from the performing bands will be on sale. Don't forget to check out the VIP packages for exclusive perks. Gates open an hour before the concert starts."
  };
  
  const event10 = {
    date: '2024-06-01',
    title: "Farmers Market",
    startHour: 7.75,
    duration: 4,
    location: "",
    link: "",
    color: "#32CD32",
    details: "Fresh produce and handmade goods available at the Farmers Market. This market brings together local farmers and artisans to offer a wide variety of fresh fruits, vegetables, baked goods, and handmade crafts. It's the perfect place to shop for healthy and organic products while supporting local businesses. In addition to shopping, enjoy live music, cooking demonstrations, and family-friendly activities. The market is held rain or shine, so come prepared for any weather. Bring your reusable bags and enjoy a day of community and connection. This is a weekly event, so mark your calendars and make it a regular part of your weekend routine."
  };
  
  const event11 = {
    date: '2024-05-26',
    title: "Marathon",
    startHour: 6,
    duration: 5,
    location: "City Streets",
    link: "https://marathon.com/event/26may",
    color: "#FF6347",
    details: "Join the annual city marathon. Registration required. This marathon is open to runners of all levels, from beginners to seasoned athletes. The course will take you through scenic routes around the city, with water stations and medical support available along the way. All participants will receive a race bib, timing chip, and finisher medal. Top finishers in various age categories will be awarded prizes. Pre-race warm-up sessions and post-race recovery areas will be provided. Spectators are welcome to cheer on the runners and enjoy the festive atmosphere. Register early to secure your spot and be part of this exciting event."
  };
  
  const event12 = {
    date: '2024-05-27',
    title: "Tech Talk",
    startHour: 18,
    duration: 2,
    location: "Tech Conference Hall",
    link: "https://techtalk.com/event/27may",
    color: "#4682B4",
    details: "Hear from industry experts on the latest trends in technology. This tech talk will cover a range of topics, including artificial intelligence, cybersecurity, and the future of work. Attendees will have the opportunity to ask questions and engage in discussions with the speakers. The event is ideal for professionals, students, and anyone interested in technology. Refreshments will be provided during the networking session after the talks. Don't miss this chance to gain insights from leading experts and connect with peers in the tech community. Registration is required, so reserve your seat today. Check the event link for more details and speaker bios."
  };

const exampleEvents = new Map();
exampleEvents.set(1, event1);
exampleEvents.set(2, event2);
exampleEvents.set(3, event3);
exampleEvents.set(4, event4);
exampleEvents.set(5, event5);
exampleEvents.set(6, event6);
exampleEvents.set(7, event7);
exampleEvents.set(8, event8);
exampleEvents.set(9, event9);
exampleEvents.set(10, event10);
exampleEvents.set(11, event11);
exampleEvents.set(12, event12);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Calendar events={exampleEvents}/>
    </React.StrictMode>
);

/*

todo

- add event (fields: name, days, time, link, color, description) | backend
    - parse multi-day events into broken up pieces per day
    - time == -1 for all day events (not shown on calendar but only on sidebar)
- handle concurrent events (stack them appropriately and prioritize the one being hovered over)


*/