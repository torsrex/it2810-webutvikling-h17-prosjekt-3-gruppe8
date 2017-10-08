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
    return <div className="centerText redText">
      {this.state.error}</div>
  }
  render() {
    return (
      <div className="componentWrapper flexColumn">
        <h4 className="centerText whiteHeader">Create a todo entry</h4>
        <form className="staticForm" onSubmit={(i) => this.handleCreate(i)}>
          <FormGroup>
            <FormControl type="text" placeholder="What do I need to do" inputRef={(ref) => {
              this.input = ref
            }}/>
            <Button block type="submit">Add</Button>
            {this.renderError()}
          </FormGroup>
        </form>
      </div>
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
