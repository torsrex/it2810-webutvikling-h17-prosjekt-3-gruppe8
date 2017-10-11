import React from 'react'
import {months} from '../../utils'
import {Button} from 'react-bootstrap'

const Header = ({year, month, changeDate}) => {

  return (
    <div className="calendar-header">
      <div>
        <h4>{year} {months[month]}</h4>
      </div>
      <div>
        <Button
          className="step-month-btn prev-month"
          onClick={() => changeDate(-1)}>{"<"}</Button>
        <Button
          className="step-month-btn today-month"
          onClick={() => changeDate(0)}
        >
          Today
        </Button>
        <Button
          className="step-month-btn next-month"
          onClick={() => changeDate(1)}>{">"}</Button>
      </div>
    </div>
  )
}

export default Header
