## RSS Calendar

An event calendar built from scratch for the UCLA Regents Scholar Society.

### Functional Features

* Events can be added by permitted users via this spreadsheet: https://docs.google.com/spreadsheets/d/1MyVuOGyTmmSHDmo_WP8Sog_RUScAufnwZfSi0A1rFoU/edit?usp=sharing.
* Specify event title, time (or all-day), location (optional), link (optional), color, and description (optional).
* Hover over events to emphasize their depth and color.
* View the timeline for a single day by clicking on an event occurring on the day or clicking on the date.

### Logical Features

* Scrollbar defaults to earliest event of the day, after 5am but before 10am.
* Algorithmically determines the week name as aligned with the UC quarter system.
* Memoization of a day's event list for portable and efficient re-rendering.
* Intentional CSS container design and overflow properties.

### To-Do

* Concurrent events can be handled better; develop a visually aesthetic system to layer events which occur at the same time.