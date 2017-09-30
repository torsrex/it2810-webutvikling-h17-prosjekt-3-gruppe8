import React from 'react'
import {months} from '../../utils'

const DayBig = ({events, date:{month, day}, closeBigDay, deleteEvent}) => {

  // Close big day on pressing ESC key.
  document.addEventListener("keydown", (e)=> {
      e.keyCode === 27 && closeBigDay()
  })

  return (
    <div className="big-day">
      <div className="big-day-header">
        <div>{months[month]}</div>
        <div>{day}</div>
      </div>
      <span className="close-big-day close" onClick={() => closeBigDay()}>&times;</span>
      <ul>
        {Object.keys(events).map(key => {
          const {content, color} = events[key]
          return(
            <li className="big-day-event" key={key}>
              <span className={color}/>
              <p>{content}</p>
              <button className="btn btn-danger btn-sm" data-key={key} onClick={e => deleteEvent(e)}>Delete event</button>
            </li>
          )
        })}

      </ul>
    </div>
  )
}

export default DayBig
