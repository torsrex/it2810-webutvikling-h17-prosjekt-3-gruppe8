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
  renderError() {
    if (!this.state.error) {
      return null
    }
    return <div>
      {this.state.error}</div>
  }
  render() {
    return (
      <form onSubmit={this.handleCreate.bind(this)}>
        <FormGroup>
          <FormControl type="text" placeholder="What do I need to do" inputRef={(ref) => {
            this.input = ref
          }}/>
          <Button block>Create</Button>
          {this.renderError()}
        </FormGroup>
      </form>
    )
  }

  handleCreate(event) {
    event.preventDefault()

    const createInput = this.input
    const task = String.prototype.trim.call(createInput.value)
    const validateInput = this.validateInput(task)
    if (validateInput) {
      this.setState({error: validateInput})
      return
    }
    //TODO: Fix not save on many whitespaces
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
}
