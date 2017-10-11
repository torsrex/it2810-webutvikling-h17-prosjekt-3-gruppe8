import React, {Component} from 'react'
import { TouchableOpacity, Text} from 'react-native'

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
    const hasEvent = dayEvents && Object.keys(dayEvents).length !== 0
    return (
      <TouchableOpacity
        style={{
          borderWidth: 0.5,
          borderColor: "#eee",
          paddingTop: 24,
          paddingBottom: 24,
          backgroundColor: isPlaceholder ? "#333" : isToday ? "#040" : hasEvent ? "#f00" : "#555"
        }}
        onPress={() => !isPlaceholder && hasEvent && this.handleClick()}>
        <Text style={{
          textAlign: "center",
          color: isPlaceholder ? "#555" : "#ededed"
        }}>{day}</Text>
      </TouchableOpacity>
    )
  }
}
