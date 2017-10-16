import React, { Component } from 'react'
import Day from './Day'
import Header from './Header'
import {week, parseDate} from '../../utils'
import 'datejs'



// Initialize thing
const fullDate = Date.today()
const year = fullDate.getFullYear()
const month = fullDate.getMonth()

const initialState = {
  date: {
    fullDate, year, month,
    daysInMonth: Date.getDaysInMonth(year, month)
  },
  today: new Date()
}



// Simple statless component, returns a list of days.
const Days = ({days}) => {
  return <ul className="days">{days}</ul>
}

// Simple statless component, returns the weekdays.
const Weekdays = ({days}) => {
  return(
    <ul className="days-title">
      {Array(days.length).fill().map((x,i) => <li key={i} className={`day-title ${(i === 5 || i === 6) && "weekend-title"}`}><span>{days[i]}</span></li>)}
    </ul>
  )
}


// Month view for the events
export default class Month extends Component {
  constructor(){
    super()
    this.state = initialState
  }


  // Takes either -1, 0 or 1 as an input, and changes the month accordingly.
  // 0 sets the month to today's month
  changeDate(direction){
    const {date} = this.state
    let {fullDate, year} = date
    let month = (date.month + direction) % 12
    if (!direction) {
      fullDate = new Date()
      year = fullDate.getFullYear()
      month = fullDate.getMonth()
      this.setState({
        date: {
          fullDate, year, month,
          daysInMonth: Date.getDaysInMonth(year, month)
        }
      })
      return
    } else {
      if (date.month + direction === 12) {
        month = 0
        year += direction
      } else if (date.month + direction < 0) {
        month += 12
        year += direction
      }
      fullDate.setMonth(month)
      this.setState({
        date:{
          fullDate, year, month,
          daysInMonth: Date.getDaysInMonth(year, month)
        }
      })

    }
  }

  // Some keyboard key event listeners
  handleKeyUp(e){
    switch (e.keyCode) {
      case 37:
        // Left arrow changes to previous month
        this.changeDate(-1)
        break
      case 39:
      // Right arrow changes to previous month
        this.changeDate(1)
        break
      case 77:

      // M to changes this month
        this.changeDate(0)
        break
      default:
        return
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", e => this.handleKeyUp(e), true)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", e => this.handleKeyUp(e), true)
  }

  render() {



    let days = []
    const {openBigDay, events} = this.props
    const {date, today} = this.state
    const {fullDate, year, month, daysInMonth} = date
    // Generate placeholder days before the shown month.
    for (let i = new Date(year, month, 1).getUTCDay(); i > 0 ; i--) {
      days.push(
        <Day
          key={i+100}
          day={new Date(year, month, -i+1).getDate()}
          isPlaceholder
          openBigDay={openBigDay}
        />
      )
    }


    const placeholderLengthBefore = days.length
    // Generate the month.
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = i === today.getDate() && today.toDateString() === fullDate.toDateString()
      let dayEvents = {}

      Object.keys(events).forEach(key => {
        const event = events[key]
        const {from, to, content, color} = event
        const day = parseDate(year, month, i)
        // HACK: Shift calendarEvent one day to left
        const dayFrom = parseDate(from-86400000)
        const dayTo = parseDate(to-86400000)

        if (day >= dayFrom && day <= dayTo) {
          let calendarEvent = dayEvents[key] = {content, color}
          if (day === dayFrom)  {
            Object.assign(calendarEvent, {from: true})
          }
          if (day === dayTo) {
            Object.assign(calendarEvent, {to: true})
          }
        }
      })

      days.push(<Day {...{key: i, day: i, isToday, month, openBigDay, dayEvents}}/>)
    }

    // Pushing the next months' first days to the end of the months so it is always 42 days on the page.
    // 42 to deal with unwanted jumping of the screen from different month lengths.
    for (var i = days.length; i < 42; i++) {
      days.push(
        <Day key={i+200} day={i-daysInMonth-placeholderLengthBefore+1}
          {...{openBigDay}}
          isPlaceholder
        />
      )
    }

    return (
      <div id="month-wrapper">
        <Header {...{year,month}} changeDate={direction => this.changeDate(direction)}/>
        <Weekdays days={week}/>
        <Days days={days}/>
      </div>
    )
  }
}
