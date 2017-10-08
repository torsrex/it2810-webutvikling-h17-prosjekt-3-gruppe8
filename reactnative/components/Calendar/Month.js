import React, { Component } from 'react'
import Day from './Day'
import Header from './Header'
import {week, parseDate} from '../../utils'
import {StyleSheet, FlatList, Text, View, Button, PixelRatio, ScrollView } from 'react-native'


const fullDate = new Date()
const year = fullDate.getFullYear()
const month = fullDate.getMonth()

const initialState = {
  date: {
    fullDate, year, month,
    daysInMonth: new Date(year,month,-1).getDate()
  },
  today: new Date()
}
const Days = ({days}) => {
  return <FlatList horizontal
    data={days}
    renderItem={({item}) => <View>{item}</View>}
    />
}

const Weekdays = () => (
  <FlatList horizontal
    data={week}
    renderItem={({item}) => <Text style={styles.day}>{item.key}</Text>}
  />
)

export default class Month extends Component {
  constructor(){
    super()
    this.state = initialState
  }

  changeDate(direction){
    const {date} = this.state
    let {fullDate, year} = date
    let month = (date.month + direction) % 12
    fullDate.setFullYear(year + direction)
    if (!direction) {
      fullDate = new Date()
      year = fullDate.getFullYear()
      month = fullDate.getMonth()
      this.setState({
        date: {
          fullDate, year, month,
          daysInMonth: new Date(year,month,0).getDate()
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
          daysInMonth: new Date(year, month+1, 0).getDate()
        }
      })

    }
  }

  handleKeyUp(e){
    switch (e.keyCode) {
      case 37:
        this.changeDate(-1)
        break
      case 39:
        this.changeDate(1)
        break
      case 77:
        this.changeDate(0)
        break
      default:
        return
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
          style={styles.day}
          key={i+100}
          day={new Date(year, month, -i+1).getDate()}
          isPlaceholder
          openBigDay={openBigDay}
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

      days.push(<Day style={styles.day} {...{key: i, day: i, isToday, month, openBigDay, dayEvents}}/>)
    }

    // Pushing the next months' first days to the end of the months so it is always 42 days on the page.
    for (var i = days.length; i < 42; i++) {
      days.push(
        <Day style={styles.day} key={i+200} day={i-daysInMonth-placeholderLengthBefore+1}
          {...{openBigDay}}
          isPlaceholder
        />
      )
    }
    return (
      <ScrollView>
        <Header
          {...{
            year,month
          }}
          changeDate={direction => this.changeDate(direction)}
        />
        <Weekdays/>
        {days.map( (e,i) => (i % 7 === 0) ? <Days key={i} days={days.slice(i, i + 7)}/> : null ).filter( (e) => e )}
      </ScrollView>
    )
  }
}


const styles = StyleSheet.create({
  weekdays: {
    display: "flex",
    flexDirection: "row"
  },
  day: {
    margin: PixelRatio.getPixelSizeForLayoutSize(5)
  },
  weekendDay: {
    color: "red"
  }
})
