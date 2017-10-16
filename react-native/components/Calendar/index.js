import React, { Component } from 'react'
import { StyleSheet, Text, ScrollView, View, AsyncStorage } from 'react-native'
import { Button, Icon, Fab, Toast } from 'native-base'


import Month from './Month'
import CreateEvent from './CreateEvent'
import BigDay from './BigDay'
import {parseObject, stringifyObject} from '../../utils'

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



export default class Calendar extends Component {
  constructor(){
    super()
    this.state = initialState
  }



  toggleCreateEvent = () => this.setState(({createEventVisible}) => ({createEventVisible: !createEventVisible}))

  openBigDay(dayData) {
    const {date, dayEvents} = dayData
    this.setState(prevState => ({
      bigDay: {
        isBigDay: true,
        date,
        bigDayEvents: dayEvents
      }
    }))
  }

  closeBigDay(){
    this.setState({bigDay})
  }

  componentWillMount = () => {
    AsyncStorage.getItem("events")
      .then(events => events && this.setState({events: parseObject(events)}))
      .catch(e => console.log(e))
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

    AsyncStorage.setItem('events', stringifyObject(events))
    Toast.show({
      "text": "Event added",
      type: "success",
      duration: 3000
    })
  }

  reset = () => {
    if (!Object.keys(this.state.events).length) {
      this.setState(initialState)
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
      AsyncStorage.setItem('events', '{}')
      this.setState({events: {}}, () => {
        Toast.show({
          "text": "Event deleted",
          duration: 3000
        })
      })

    } else {
      this.setState({events}, () => {
        AsyncStorage.setItem('events', stringifyObject(events))
        Toast.show({
          "text": "Event deleted",
          duration: 3000
        })
      })
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
            reset={this.reset}
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
