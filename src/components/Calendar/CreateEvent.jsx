import React, { Component } from 'react'
import {parseObject, parseDate, generateId,stringifyObject} from "../../utils"


const today = new Date().getTime()
const emptyNewEvent =  {
  content: "",
  from: today,
  to: today,
  color: "red"
}
export default class CreateEvent extends Component {
  constructor() {
    super()
    this.state = {
      newEvent: emptyNewEvent,
      events: parseObject(localStorage.getItem('events'))
    }
  }

  handleInputChange(e, type) {
    let {value} = e.target
    const {from} = this.state.newEvent
    if (type === "from" || type === "to") {
      value = new Date(value).getTime()
    }
    if (type === "to" && value <= from) {
      alert("Til dato må være større enn fra dato.")
    } else {
      this.setState(prevState => ({
        newEvent: {
          ...prevState.newEvent,
          [type]: value
        }
      }))
    }
  }

  componentWillMount() {
    parseObject(localStorage.getItem('events')) === null && localStorage.setItem('events', stringifyObject({}))
  }

  handleClick(e) {
    e.preventDefault()
    let {newEvent, events} = this.state
    events = Object.assign(
      {[generateId()]: newEvent},
      parseObject(localStorage.getItem('events'))
    )

    if (newEvent.content !== "") {
      this.setState({
        newEvent: emptyNewEvent,
        events
      })
      localStorage.setItem('events', stringifyObject(events))

    } else {
      alert('Tom input!')
    }
  }

  render() {
    const {newEvent} = this.state
    const {content, from, to} = newEvent
    return(
      <div>
        <div>
          <div>
            <input value={content} type="text" onChange={(e, type) => this.handleInputChange(e, "content")}/>
            <input value={parseDate(from)} type="date" onChange={(e, type) => this.handleInputChange(e, "from")}/>
            <input value={parseDate(to)} type="date" onChange={(e, type) => this.handleInputChange(e, "to")}/>
            <select onClick={(e, type) => this.handleInputChange(e, "color")}>
              <option value="red">Rødt</option>
              <option value="orange">Oransj</option>
              <option value="green">Grønn</option>
              <option value="blue">Blå</option>
              <option value="brown">Brun</option>
            </select>
          </div>
          <button onClick={e => this.handleClick(e)}>Legg til event</button>
          <button onClick={() => localStorage.setItem('events', '{}')}>Tømm localStorage</button>
        </div>
      </div>
    )
  }
}
