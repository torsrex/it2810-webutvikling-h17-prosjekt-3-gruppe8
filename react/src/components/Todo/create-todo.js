/*
Component that renders the form for creating new todos.
Handles creation/validation of new todo items.
*/

import _ from 'lodash'
import React, {Component} from 'react'
import {FormGroup, FormControl, Button} from 'react-bootstrap'

export default class CreateTodo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null
    }
  }

  //Create new todo with input from user
  handleCreate(event) {
    event.preventDefault()

    const createInput = this.input
    const task = String.prototype.trim.call(createInput.value)
    const validateInput = this.validateInput(task)
    if (validateInput) {
      this.setState({error: validateInput})
      return
    }
    this.setState({error: null})
    this.props.createTask(task)
    this.input.value = ''
  }
  validateInput(task) {
    if (!task) {
      return 'Please enter a task'
    } else if (_.find(this.props.todos, todo => todo.task === task)) {
      return 'Task already exists'
    } else {
      return null
    }
  }

  //Render error message for todo creation
  renderError() {
    if (!this.state.error) {
      return null
    }
    return <div className="center-text red-text">
      {this.state.error}</div>
  }

  render() {
    return (
      <div className="component-wrapper flex-column">
        <h4 className="center-text white-header">Create a todo task</h4>
        <form className="static-form" onSubmit={(i) => this.handleCreate(i)}>
          <FormGroup>
            <FormControl
              type="text"
              placeholder="What do I need to do"
              inputRef={(ref) => {this.input = ref}
            }/>
            <Button block type="submit">add</Button>
            {this.renderError()}
          </FormGroup>
        </form>
      </div>
    )
  }
}
