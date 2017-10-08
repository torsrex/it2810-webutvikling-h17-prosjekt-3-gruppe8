import React from 'react'

const Day = ({dayEvents, day, month , isPlaceholder, isToday, openBigDay}) => {
  let dayEventsList = []
  let dayTitle = []
  if (dayEvents) {
    Object.entries(dayEvents).forEach(calendarEvent => {
      const [key, value] = calendarEvent
      const {content, from, to, color} = value
      dayEventsList.push(
        <li key={key} className={`day-event ${color} ${from && to ? "from-to" : from ? "from" : to && "to"}`}/>
      )
      dayTitle.push(content)
    })
  }

  const handleClick = () => {
    openBigDay({
      date: {day,month},
      dayEvents
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
          {dayEventsList}
        </ul>
      }
    </li>
  )
}

export default Day
