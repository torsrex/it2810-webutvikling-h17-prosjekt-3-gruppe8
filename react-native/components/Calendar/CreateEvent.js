import React, { Component } from 'react'
import {parseDate, } from "../../utils"
import { AsyncStorage } from 'react-native'
import { Picker, Form, Item, Card, Text, View, Button, TextInput, Icon, Label, Input, Toast} from 'native-base'
import Datepicker from 'react-native-datepicker'
import 'datejs'
import uuid from 'uuid'

const today = new Date().getTime()
const emptyEvent =  {
  content: "",
  from: today,
  to: today,
  color: "red"
}

export default class CreateEvent extends Component {
  constructor() {
    super()
    this.state = {
      event: emptyEvent
    }
  }

  handleInputChange = (value, type) => {
    const {from, to} = this.state.event
    if (type === "from" || type === "to") {
      value = new Date(value).getTime()
    }
    if ((type === "to" && value <= from) || (type === "from" && value >= to)) {
      Toast.show({
        "text": "Event start time must be before event end time.",
        type: "warning",
        duration: 3000
      })

    } else {
      this.setState(({event}) => ({
        event: {
          ...event,
          [type]: value
        }
      }))
    }
  }

  handleColorPick = itemValue => {
    this.setState(({event}) => ({
      event: {
        ...event,
        color: itemValue
      }
    }))
  }

  handleAddEventClick = () => {
    const {event} = this.state
    if (event.content !== "") {
      this.props.createEvent({[uuid.v4()]: event})
      this.setState({event: emptyEvent})
    } else {
      Toast.show({
        "text": "Event description cannot be empty.",
        type: "warning",
        duration: 3000
      })
    }
  }

  emptyAsyncStorage = () => {
    AsyncStorage.setItem('events', '{}')
      .then(() => {
        this.props.reset()
      })
    Toast.show({
      "text": "All events were deleted.",
      type: "danger",
      duration: 3000
    })
  }

  render() {
    const {event} = this.state
    const {closeCreateEvent} = this.props
    const {content, from, to, color} = event
    return(
      <View style={{margin: 10}}>
        <Card style={{padding: 10}}>
          <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
            <Button rounded danger onPress={() => closeCreateEvent()}>
              <Icon name="close"/>
            </Button>
          </View>
          <Item floatingLabel>
            <Label>Description...</Label>
            <Input value={content} onChangeText={value => this.handleInputChange(value, 'content')}/>
          </Item>
          <View style={{alignItems: "center"}}>
            <Label>From</Label>
            <Datepicker
              date={new Date(from)}
              onDateChange={date => this.handleInputChange(date, "from")}
            />
            <Label>To</Label>
            <Datepicker
              date={new Date(to)}
              onDateChange={date => this.handleInputChange(date, "to")}
            />
          </View>
          <Picker
            selectedValue={color}
            onValueChange={this.handleColorPick}
          >
            {
                ["red", "orange", "green", "blue", "brown", "purple"]
              .map(color =>
                <Picker.Item key={color} label={color} value={color}/>)
            }
          </Picker>
          <View style={{flexDirection:"row", justifyContent: "space-between"}}>
            <Button success onPress={this.handleAddEventClick}>
              <Text>Add event</Text>

            </Button>
            <Button danger iconRight onPress={this.emptyAsyncStorage}>
              <Text>Empty calendar</Text>
              <Icon name="trash"/>
            </Button>
          </View>
        </Card>
      </View>
    )
  }
}
