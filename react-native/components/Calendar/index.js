import React, { Component } from 'react'
import { StyleSheet, Text, ScrollView, View } from 'react-native'
import { Button, Icon, Fab } from 'native-base'


import Month from './Month'
import CreateEvent from './CreateEvent'
import BigDay from './BigDay'
import {parseObject, stringifyObject} from '../../utils'

// const events = localStorage.getItem('events') ? parseObject(localStorage.getItem('events')) : {}

const events = {
  "0.02h1p8qbflx5": {
    "content": "It is an event",
    "from": 1506643200000,
    "to": 1506729600000,
    "color": "orange"
  },
  "0.cr5uoi7dq4j": {
    "content": "hæ",
    "from": 1506384000000,
    "to": 1506618757051,
    "color": "green"
  },
  "0.ceeiifax1ql": {
    "content": "ha",
    "from": 1505692800000,
    "to": 1506618757051,
    "color": "brown"
  },
  "0.edz4756s8f8": {
    "content": "ho",
    "from": 1504742400000,
    "to": 1505174400000,
    "color": "red"
  },
  "0.8ly2do89rmb": {
    "content": "hei",
    "from": 1506384000000,
    "to": 1506618757051,
    "color": "blue"
  }
}



const bigDay = {
  isBigDay: false,
  date: {},
  bigDayEvents: {},
}
const initialState = {
  events, bigDay, createEventVisible: true
}

export default class Calendar extends Component {
  constructor(){
    super()
    this.state = initialState
  }


  toggleCreateEvent = () => this.setState(({createEventVisible}) => ({createEventVisible: !createEventVisible}))

  openBigDay(dayData) {
    const {date, dayEvents} = dayData
    // if (Object.keys(dayEvents).length !== 0) {
      this.setState(prevState => ({
        bigDay: {
          isBigDay: true,
          date,
          bigDayEvents: dayEvents
        }
      }))
    // } else {
      // this.closeBigDay()
    // }
  }

  closeBigDay(){
    this.setState({bigDay})
  }

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

  deleteEvent(eventKey) {
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
      // localStorage.setItem('events', stringifyObject({}))
    } else {
      this.setState({events})
      // localStorage.setItem('events', stringifyObject(events))
    }
  }

  render(){
    const {bigDay: {isBigDay, date, bigDayEvents}, events, createEventVisible} = this.state
    return (
      <ScrollView>
        {createEventVisible &&
          <CreateEvent
            closeCreateEvent={() => this.toggleCreateEvent()}
            createEvent={event => this.createEvent(event)}
          />
        }
        {isBigDay &&
          <BigDay
            closeBigDay={() => this.closeBigDay()}
            date={date}
            events={bigDayEvents}
            deleteEvent={eventKey => this.deleteEvent(eventKey)}
          />
        }
        <Month
          openBigDay={day => this.openBigDay(day)}
          events={events}
        />
        <Fab
          position="bottomRight"
          onPress={this.toggleCreateEvent}
        >
          <Icon name="add"/>
        </Fab>
      </ScrollView>
    )
  }
}
