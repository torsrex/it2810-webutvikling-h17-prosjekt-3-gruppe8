import React, { Component } from 'react'
import {parseDate, generateId} from "../../utils"
import { StyleSheet, Text, View, Button, TextInput, Picker} from 'react-native'


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

  handleInputChange(e, type) {
    let {value} = e.target
    const {from, to} = this.state.event
    if (type === "from" || type === "to") {
      value = new Date(value).getTime()
    }
    if ((type === "to" && value <= from) || (type === "from" && value >= to)) {
      alert("Event start time must be before event end time.")
    } else {
      this.setState(prevState => ({
        event: {
          ...prevState.event,
          [type]: value
        }
      }))
    }
  }

  handleColorPick(itemValue, itemIndex) {
    this.setState(prevState => ({
      event: {
        ...prevState.event,
        color: itemValue
      }
    }))
  }


  handleClick(e) {
    e.preventDefault()
    const {event} = this.state
    const newEvent = {[generateId()]: event}
    if (event.content !== "") {
      this.props.createEvent(newEvent)
      this.setState({event: emptyEvent})
    } else {
      alert("Empty content!")
    }
  }

  render() {
    const {event} = this.state
    const {closeCreateEvent} = this.props
    const {content, from, to, color} = event
    const colors = ["red", "orange", "green", "blue", "brown", "purple"].map(color =>
      <Picker.Item key={color} label={color} className={color} value={color}/>
        )

        return(
        <View className="create-event">
          <Button title="&times;" onPress={() => closeCreateEvent()} className="close-create-event close" aria-label="Close"/>
          <TextInput className="form-control" placeholder="Description..." value={content} type="text" onChange={(e, type) => this.handleInputChange(e, "content")}/>
          <View className="create-event-dates">
            {/* <TextInput value={parseDate(from)} type="date" onChange={(e, type) => this.handleInputChange(e, "from")}/>
            <TextInput value={parseDate(to)} type="date" onChange={(e, type) => this.handleInputChange(e, "to")}/> */}
          </View>
          <Picker className="create-event-color-select" selectedValue={color} onValueChange={(itemValue, itemIndex) => this.handleColorPick(itemValue)}>
          {colors}
        </Picker>
        <View>
          <Button title="Add event" className="btn btn-primary btn-sm" onPress={e => this.handleClick(e)}/>
          <Button title="Empty localStorage" className="btn btn-danger btn-sm" onPress={() => localStorage.setItem('events', '{}')}/>
        </View>
      </View>
    )
  }
}
