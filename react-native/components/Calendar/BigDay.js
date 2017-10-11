import React, {Component} from 'react'
import {months} from '../../utils'
import {StyleSheet, FlatList, View, PixelRatio, ScrollView } from 'react-native'
import {Icon, Text, Button} from 'native-base'
export default class DayBig extends Component {
  render() {
    const {events, date:{month, day}, closeBigDay, deleteEvent} = this.props
  return (
    <View style={{backgroundColor: "#ccc", padding: 10}}>
      <View style={{
        flexDirection: "row",
        marginBottom: 20,
        justifyContent: "space-between"
      }}>

        <Text
          style={{
            textAlign: "center",
            padding: 10
          }}
        >{months[month]} {day}</Text>
        <Button onPress={() => closeBigDay()}>
          <Icon name="md-close"/>
        </Button>
      </View>
      <View>
        {Object.keys(events).map(key => {
          const {content, color} = events[key]
          return (
            <View
              key={key}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Text>{content}</Text>
              <Button onPress={key => deleteEvent(key)}>
                <Icon name="md-remove"/>
              </Button>
            </View>
          )
        })}
      </View>
    </View>
  )
}
}
