import React, { Component } from 'react'
import { StyleSheet, Text, ScrollView, View, AsyncStorage } from 'react-native'
import { Button, Icon, Fab } from 'native-base'


import Month from './Month'
import CreateEvent from './CreateEvent'
import BigDay from './BigDay'
import {parseObject, stringifyObject} from '../../utils'

// const events = localStorage.getItem('events') ? parseObject(localStorage.getItem('events')) : {}
let events = {}
try {
  events =  AsyncStorage.getItem('@Events:key');
} catch (error) {
  console.log("Error getting the data!");
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
    console.log(stringifyObject(events));
    try {
      AsyncStorage.setItem('Events', stringifyObject(events))
    } catch (e) {
      console.log(e)
    }
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
