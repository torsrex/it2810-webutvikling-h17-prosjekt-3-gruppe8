import React, { Component } from 'react';
import './index.css';

import Welcome from './components/Welcome'
import Calendar from './components/Calendar'
import Notes from './components/Notes'
import Todo from './components/Todo'

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      openedMenuItem: "welcome"
    }
  }

  handleMenuItemClick(openedMenuItem) {
    this.setState({openedMenuItem})
  }

  render() {
    const {openedMenuItem} = this.state
    return (
      <div className="App">
        <header>
          <nav>
            <ul>
              <li onClick={() => this.handleMenuItemClick("welcome")}>
                Home
              </li>
              <li onClick={() => this.handleMenuItemClick("calendar")}>
                Calendar
              </li>
              <li onClick={() => this.handleMenuItemClick("todo")}>
                Todo
              </li>
              <li onClick={() => this.handleMenuItemClick("notes")}>
                Notes
              </li>
            </ul>
          </nav>
        </header>
        {{
          "calendar":
          <Calendar/>,
          "todo":
          <Todo/>,
          "notes":
          <Notes/>,
          "welcome":
          <Welcome/>
        }[openedMenuItem]}
      </div>
    )
  }
}
