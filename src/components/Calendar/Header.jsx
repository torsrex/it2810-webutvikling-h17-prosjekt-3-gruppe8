import React from 'react'

const Header = ({year, month, changeDate}) => {
  const months = [
    "Januar", "Februar", "Mars",
    "April", "Maj", "Juni",
    "Juli", "August", "September",
    "Oktober", "November", "Desember"]
  return (
    <div className="calendar-header">
      <h4>{year}</h4>
      <h3>{months[month]}</h3>
      <button
        className="step-month-btn prev-month"
        onClick={() => changeDate(-1)}>Forrige</button>
      <button
        className="step-month-btn today-month"
        onClick={() => changeDate(0)}
      >
        I dag
      </button>
      <button
        className="step-month-btn next-month"
        onClick={() => changeDate(1)}>Neste</button>
    </div>
  )
}

export default Header
