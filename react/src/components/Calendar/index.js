import React, { Component } from 'react'
import Month from './Month'
import CreateEvent from './CreateEvent'
import BigDay from './BigDay'
import {parseObject, updateLocalStorage} from '../../utils'



// Initialize thing
const bigDay = {
  isBigDay: false,
  date: {},
  bigDayEvents: {},
}
const initialState = {
  events: {},
  bigDay,
  createEventVisible: false
}



// Main Calendar component
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


  // Fetch events from localStorage.
  componentDidMount() {
    const events = localStorage.getItem('events')
    this.setState({
      events: events ? parseObject(events) : {}
    })
  }


  // Reset big day components content
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
      this.setState(({bigDay}) => {
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
    updateLocalStorage('events', this.state.events)
  }

  reset = () => {
      this.setState(initialState)
      updateLocalStorage('events', {})
  }

  //Delete a calendar event
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
      this.setState({events: {}}, () => updateLocalStorage('events', {}))
    } else {
      this.setState({events}, () => updateLocalStorage('events', events))
    }
  }

  render() {
    const {bigDay: {isBigDay, date, bigDayEvents}, events, createEventVisible} = this.state
    return (
      <div>
        <div className="component-main-div mini-main-div"/>
        <div id="calendar-wrapper">
          {createEventVisible ?
            <CreateEvent
              reset={this.reset}
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
