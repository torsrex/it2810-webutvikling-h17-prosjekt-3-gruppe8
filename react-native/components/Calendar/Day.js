import React, {Component} from 'react'
import { FlatList, Text, View, Button } from 'react-native'

export default class Day extends Component {

  handleClick = () => {
    const {day, month, dayEvents} = this.props
    this.props.openBigDay({
      date: {day,month},
      dayEvents
    })
  }
  render() {
    const {dayEvents, day, month , isPlaceholder, isToday, openBigDay} = this.props
    let dayEventsList = []
    let dayTitle = []
    if (dayEvents) {
      Object.entries(dayEvents).forEach(calendarEvent => {
        const [key, value] = calendarEvent
        const {content, from, to, color} = value
        dayEventsList.push(
          <View key={key} className={`day-event ${color} ${from && to ? "from-to" : from ? "from" : to && "to"}`}/>
        )
        dayTitle.push(content)
      })
    }
    return (
      <View>
        {isPlaceholder
          ?
            <Text>{day}</Text>
          :
          <Button title={day.toString()} onPress={() => !isPlaceholder && this.handleClick()}/>
        }
      </View>
    )
  }
}
