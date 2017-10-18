import React from 'react'

// A simple day on a calendar.
// If a day is a placeholder, it will have a darker color, and no events are shown.
// If a day is today, it is marked differently then the rest.

// If a day has events, it will show the events in a list.
// An event is spanning over different days. The first and last day of an event is marked by a rounded corner.
// There are 6 possible colors supported by this calendar. They appear vertically under each other.
const Day = ({
  dayEvents,
  day,
  month,
  isPlaceholder,
  isToday,
  openBigDay
}) => {
  let dayEventsList = []
  let dayTitle = []
  if (dayEvents) {
    Object.entries(dayEvents).forEach(calendarEvent => {
      const [key,
        value] = calendarEvent
      const {content, from, to, color} = value
      dayEventsList.push(<li key={key} className={`day-event ${color} ${from && to
        ? "from-to"
        : from
          ? "from"
          : to && "to"}`}/>)
      dayTitle.push(content)
    })
  }

  const handleClick = () => {
    openBigDay({
      date: {
        day,
        month
      },
      dayEvents
    })
  }

  return (
    <li title={dayTitle.join(",\n")} className={`day ${isToday
      ? "today"
      : ""}${isPlaceholder
        ? "placeholder"
        : ""}`} onClick={() => !isPlaceholder && handleClick()}>
      <p>{day}</p>
      {!isPlaceholder && <ul className="day-events-list">
        {dayEventsList}
      </ul>
}
    </li>
  )
}

export default Day
