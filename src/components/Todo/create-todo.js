import _ from 'lodash'
import React, {Component} from 'react'

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
        <input type="text" placeholder="What do I need to do" ref="createInput"/>
        <button>Create</button>
        {this.renderError()}
      </form>
    )
  }

  handleCreate(event) {
    event.preventDefault()

    const createInput = this.refs.createInput
    const task = String.prototype.trim.call(createInput.value)
    const validateInput = this.validateInput(task)
    if (validateInput) {
      this.setState({error: validateInput})
      return
    }
    //TODO: Fix not save on many whitespaces
    this.setState({error: null})
    this.props.createTask(task)
    this.refs.createInput.value = ''
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
