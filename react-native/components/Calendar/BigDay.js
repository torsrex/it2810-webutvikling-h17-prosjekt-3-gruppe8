import React, {Component} from 'react'
import {months} from '../../utils'
import {StyleSheet, FlatList, View, PixelRatio, ScrollView } from 'react-native'
import {Icon, Text, Button, Card} from 'native-base'
export default class DayBig extends Component {
  render() {
    const {events, date:{month, day}, closeBigDay, deleteEvent} = this.props
  return (
    <View style={{margin: 10}}>
      <Card style={{padding: 10}}>
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
          <Button rounded onPress={() => closeBigDay()}>
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
                  marginBottom: 4,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <View style={{
                  width: 16,
                  height: 16,
                  backgroundColor: color,
                  borderRadius: 16
                }}/>
                <Text>{content}</Text>
                <Button danger small onPress={() => deleteEvent(key)}>
                  <Icon name="md-remove"/>
                </Button>
              </View>
            )
          })}
        </View>
      </Card>
    </View>
  )
}
}
