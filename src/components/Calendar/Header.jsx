import React from 'react'
import {months} from '../../utils'

const Header = ({year, month, changeDate}) => {

  return (
    <div className="calendar-header">
      <div>
        <h4>{year} {months[month]}</h4>
      </div>
      <div>
        <button
          className="step-month-btn prev-month"
          onClick={() => changeDate(-1)}>{"<"}</button>
          <button
            className="step-month-btn today-month"
            onClick={() => changeDate(0)}
            >
              Today
            </button>
            <button
              className="step-month-btn next-month"
              onClick={() => changeDate(1)}>{">"}</button>
      </div>
    </div>
  )
}

export default Header
