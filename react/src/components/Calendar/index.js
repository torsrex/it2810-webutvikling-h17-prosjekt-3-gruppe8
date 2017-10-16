import React, { Component } from 'react'
import Month from './Month'
import CreateEvent from './CreateEvent'
import BigDay from './BigDay'
import {parseObject, stringifyObject} from '../../utils'

const events = localStorage.getItem('events') ? parseObject(localStorage.getItem('events')) : {}
const bigDay = {
  isBigDay: false,
  date: {},
  bigDayEvents: {},
}
const initialState = {
  events, bigDay, createEventVisible: false
}

export default class Calendar extends Component {
  constructor(){
    super()
    this.state = initialState
  }


  toggleCreateEvent(){
    this.setState(prevState => ({createEventVisible: !prevState.createEventVisible}))}

  openBigDay(dayData) {
    const {date, dayEvents} = dayData
    if (Object.keys(dayEvents).length !== 0) {
      this.setState(prevState => ({
        bigDay: {
          isBigDay: true,
          date,
          bigDayEvents: dayEvents
        }
      }))
    } else {
      this.closeBigDay()
    }
  }

  closeBigDay(){
    this.setState({bigDay})
  }
  //Creates new calendar event
  createEvent(newEvent) {
    const key = Object.keys(newEvent)[0]
    const value = newEvent[key]
    let {events, bigDay: {isBigDay}} = this.state
    events[key] = value
    this.setState({events})
    if (isBigDay) {
      this.setState(prevState => {
        const {bigDay} = prevState
        const {bigDayEvents} = bigDay
        return ({
          bigDay: {
            ...bigDay,
            bigDayEvents: {
              ...bigDayEvents,
              [key]: value
            }
          }
        })
      })
    }
    localStorage.setItem('events', stringifyObject(events))
  }
  //Deletes calendar event
  deleteEvent(e) {
    const eventKey = e.target.getAttribute("data-key")
    const {events, bigDay: {bigDayEvents}} = this.state
    delete events[eventKey]
    if (bigDayEvents[eventKey]) {
      delete bigDayEvents[eventKey]
      if (Object.keys(bigDayEvents).length === 0) {
        this.setState({bigDay})
      }
    }

    if (Object.keys(events).length === 0) {
      this.setState({events: {}})
      localStorage.setItem('events', stringifyObject({}))
    } else {
      this.setState({events})
      localStorage.setItem('events', stringifyObject(events))
    }
  }

  render() {
    const {bigDay: {isBigDay, date, bigDayEvents}, events, createEventVisible} = this.state
    return (
      <div>
      <div className="componentMainDiv miniMainDiv"/>
      <div id="calendar-wrapper">
        {createEventVisible ?
          <CreateEvent
            closeCreateEvent={() => this.toggleCreateEvent()}
            createEvent={event => this.createEvent(event)}
          />
        : <button className="toggle-create-event-btn btn btn-primary" onClick={() => this.toggleCreateEvent()}>+</button>}
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
      </div>
    )
  }
}
