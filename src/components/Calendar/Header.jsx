import React from 'react'
import {months} from '../../utils'

const Header = ({year, month, changeDate}) => {

  return (
    <div className="calendar-header">
      <h4>{year}</h4>
      <h3>{months[month]}</h3>
      <button
        className="step-month-btn prev-month"
        onClick={() => changeDate(-1)}>Previous</button>
      <button
        className="step-month-btn today-month"
        onClick={() => changeDate(0)}
      >
        Today
      </button>
      <button
        className="step-month-btn next-month"
        onClick={() => changeDate(1)}>Next</button>
    </div>
  )
}

export default Header
