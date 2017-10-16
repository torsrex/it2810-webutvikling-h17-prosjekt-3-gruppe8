import React, { Component } from 'react'
import Day from './Day'
import {week, parseDate, months} from '../../utils'
import {StyleSheet, FlatList, View, PixelRatio, ScrollView } from 'react-native'
import {Button, Icon, Text} from 'native-base'
import 'datejs'

const fullDate = new Date()
const year = fullDate.getFullYear()
const month = fullDate.getMonth()

const initialState = {
  date: {
    fullDate, year, month,
    daysInMonth: Date.getDaysInMonth(year, month)
  },
  today: new Date()
}
const Days = ({days}) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-around"
    }}
  >
    {days.map(day => (
      <View
        key={Math.random()}
        style={{
          flexBasis: 0,
          flexGrow: 1
        }}
      >{day}</View>
    ))}
  </View>
)


const Weekdays = () => (
  <View
    style={{
      flexDirection: "row"
    }}
  >
    {week.map(day => (
      <Text
        key={day}
        style={{
          flexBasis: 0,
          flexGrow: 1,
          backgroundColor: (day === "Sa" || day === "Su") ? "red" : "black",
          paddingTop: 13,
          paddingBottom: 13,
          textAlign: "center",
          color: "#fff"
        }}
      >{day}
      </Text>))}
  </View>
)

export default class Month extends Component {
  constructor(){
    super()
    this.state = initialState
  }

  changeDate(direction) {
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


  render() {
    let days = []
    const {openBigDay, events} = this.props
    const {date, today} = this.state
    const {fullDate, year, month, daysInMonth} = date
    // Pushing the first day in the month to appropriate place.
    for (let i = new Date(year, month, 1).getUTCDay(); i > 0 ; i--) {
      days.push(
        <Day
          key={i+100}
          day={new Date(year, month, -i+1).getDate()}
          isPlaceholder
        />
      )
    }
    const placeholderLengthBefore = days.length
    // Generating the month.
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
    for (var i = days.length; i < 42; i++) {
      days.push(<Day key={i+200} day={i-daysInMonth-placeholderLengthBefore+1} isPlaceholder/>)
    }
    return (
      <ScrollView>
        <View style={{
          flexDirection: "row",
          backgroundColor: "#000"
        }}>
          <Button style={{backgroundColor: "#000"}} onPress={() => this.changeDate(-1)}><Icon name="md-arrow-back"/></Button>
          <Text style={{
            padding: 14,
            flexGrow: 2,
            color: "#fff",
            textAlign: "center"
          }}>{year} {months[month]}</Text>
          <Button style={{flexGrow:1, backgroundColor:"#000"}} onPress={() => this.changeDate(0)}><Text style={{textAlign: "center"}}>Today</Text></Button>
          <Button style={{backgroundColor: "#000"}} onPress={() => this.changeDate(1)}><Icon name="md-arrow-forward"/></Button>
        </View>
        <Weekdays/>
        {days.map( (e,i) => (i % 7 === 0) ? <Days key={i} days={days.slice(i, i + 7)}/> : null ).filter( (e) => e )}
      </ScrollView>
    )
  }
}
