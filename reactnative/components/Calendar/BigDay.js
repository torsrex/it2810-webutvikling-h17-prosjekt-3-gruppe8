import React, {Component} from 'react'
import {months} from '../../utils'
import {StyleSheet, FlatList, Text, View, Button, PixelRatio, ScrollView } from 'react-native'

export default class DayBig extends Component {
  render() {
    const {events, date:{month, day}, closeBigDay, deleteEvent} = this.props
  return (
    <View className="big-day">
      <View className="big-day-header">
        <Text>{months[month]}</Text>
        <Text>{day}</Text>
      </View>
      <Button title="&times;" className="close-big-day close" onPress={() => closeBigDay()}/>
      <View>
        {Object.keys(events).map(key => {
          const {content, color} = events[key]
          return(
            <View className="big-day-event" key={key}>
              <Text>{content}</Text>
              <Button title="Delete event" className="btn btn-danger btn-sm" data-key={key} onPress={e => deleteEvent(e)}/>
            </View>
          )
        })}

      </View>
    </View>
  )
}
}
