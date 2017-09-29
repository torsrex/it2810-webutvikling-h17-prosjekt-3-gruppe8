import React, { Component } from 'react'
import Month from './Month'
import CreateEvent from './CreateEvent'
import BigDay from './BigDay'
import {parseObject, stringifyObject} from '../../utils'

const events = localStorage.getItem('events') ? parseObject(localStorage.getItem('events')) : {}
const bigDay = {
  isBigDay: false,
  date: {},
  bigDayEvents: {}
}

const initialState = {
  events, bigDay
}

export default class Calendar extends Component {
  constructor(){
    super()
    this.state = initialState
  }

  openBigDay(dayData){
    const {date, dayEvents} = dayData
    if (Object.keys(dayEvents).length !== 0) {
      this.setState(prevState => ({
        events: prevState.events,
        bigDay: {
          isBigDay: true,
          date,
          bigDayEvents: dayEvents
        }
      }))
    }
  }

  closeBigDay(){
    this.setState(prevState => ({
      events: prevState.events,
      bigDay
    }))
  }

  createEvent(newEvent) {
    const key = Object.keys(newEvent)[0]
    const value = newEvent[key]
    let {events} = this.state
    console.log(events);
    events[key] = value
    console.log(events);
    this.setState(prevState => ({
      bigDay: prevState.bigDay,
      events
    }))
    localStorage.setItem('events', stringifyObject(events))
  }

  deleteEvent(e) {
    const eventKey = e.target.getAttribute("data-key")
    const {events} = this.state
    delete events[eventKey]
    if (Object.keys(events).length === 0) {
      this.setState({events: {}})
      localStorage.setItem('events', stringifyObject({}))
    } else {
      this.setState({events})
      localStorage.setItem('events', stringifyObject(events))
    }
  }


  render() {
    const {bigDay: {isBigDay, date, bigDayEvents}, events} = this.state
    return (
      <div id="calendar-wrapper">
        <CreateEvent
          createEvent={event => this.createEvent(event)}
        />
        <Month
          openBigDay={day => this.openBigDay(day)}
          events={events}
        />

        {isBigDay &&
          <BigDay
            closeBigDay={() => this.closeBigDay()}
            date={date}
            events={bigDayEvents}
            deleteEvent={eventKey => this.deleteEvent(eventKey)}
          />
        }
      </div>
    )
  }
}
