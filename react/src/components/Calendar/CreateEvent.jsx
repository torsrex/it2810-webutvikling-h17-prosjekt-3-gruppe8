import React, {Component} from 'react'
import {parseDate, generateId} from "../../utils"

const today = new Date().getTime()
const emptyEvent = {
  content: "",
  from: today,
  to: today,
  color: "red"
}

// Create an event
// It may semanticly be wrong to define it here, but
// this component also contains a button to delete all events from localStorage
// Because esthetical reasons.
export default class CreateEvent extends Component {
  constructor() {
    super()
    this.state = {
      event: emptyEvent
    }
  }

  // Check for the input, do some very simple validation, and upgrade
  // the state of this component.
  handleInputChange(e, type) {
    let {value} = e.target
    const {from, to} = this.state.event
    if (type === "from" || type === "to") {
      value = new Date(value).getTime()
    }
    if ((type === "to" && value <= from) || (type === "from" && value >= to)) {
      alert("Event start time must be before event end time.")
    } else {
      this.setState(({event}) => ({
        event: {
          ...event,
          [type]: value
        }
      }))
    }
  }

  // Try submitting the event. If it is successfull, the event will be sent
  // up to the main component, which will take care of adding it to the localStorage.
  handleClick(e) {
    //e.preventDefault()
    const {event} = this.state
    const newEvent = {
      [generateId()]: event
    }
    if (event.content !== "") {
      this.props.createEvent(newEvent)
      this.setState({event: emptyEvent})
    } else {
      alert("Empty content!")
    }
  }

  render() {
    const {event} = this.state
    const {closeCreateEvent, reset} = this.props
    const {content, from, to} = event
    const colors = [
      "red",
      "orange",
      "green",
      "blue",
      "brown",
      "purple"
    ].map(color => <option key={color} className={color} value={color}>{color}</option>)

    return (
      <div className="create-event">
        <button type="button" onClick={() => closeCreateEvent()} className="close-create-event close" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <input className="form-control" placeholder="Description..."
          value={content} type="text"
          onChange={(e, type) => this.handleInputChange(e, "content")}
        />
        <div className="create-event-dates">
          <input
            value={parseDate(from)}
            type="date"
            onChange={(e, type) => this.handleInputChange(e, "from")}
          />
          <input
            value={parseDate(to)}
            type="date"
            onChange={(e, type) => this.handleInputChange(e, "to")}
          />
        </div>
        <select
          className="create-event-color-select"
          onClick={(e, type) => this.handleInputChange(e, "color")}
          >
          {colors}
        </select>
        <div>
          <button
            className="btn btn-primary btn-sm"
            onClick={e => this.handleClick(e)}>
            Add event
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={reset}>
            Empty localStorage
          </button>
        </div>
      </div>
    )
  }
}
