import React from 'react'

const Day = ({calendarEvents, day, month , isPlaceholder, isToday, handleDayClick}) => {
  let dayEvents = []
  let dayTitle = []
  // console.log(calendarEvents);
  if (calendarEvents) {
    Object.entries(calendarEvents).forEach(calendarEvent => {
      const [key, value] = calendarEvent
      const {content, from, to, color} = value
      dayEvents.push(
        <li key={key} className={`day-event ${color} ${from && to ? "from-to" : from ? "from" : to && "to"}`}/>
      )
      dayTitle.push(content)
    })
  }

  const handleClick = () => {
    handleDayClick({
      date: {day,month},
      dayCalendarEvents: Object.keys(calendarEvents)
    })
  }

  return (
    <li title={dayTitle.join(",\n")}
      className={`day ${isToday ? "today" : ""}${isPlaceholder ? "placeholder" : ""}`}
      onClick={() => !isPlaceholder && handleClick()}
    >
      <p>{day}</p>
      {!isPlaceholder &&
        <ul className="day-events-list">
          {dayEvents}
        </ul>
      }
    </li>
  )
}

export default Day
