import _ from 'lodash'
import React, {Component} from 'react'
import TodosList from './todos-list'
import CreateTodo from './create-todo'
import {stringifyObject, parseObject} from '../../utils'
import {Grid, Row} from 'react-bootstrap'
import uuid from 'uuid'

const todos = [
  {
    id: uuid.v4(),
    task: 'First task is here',
    isComplete: true
  }, {
    id: uuid.v4(),
    task: 'Second task is here',
    isComplete: false
  }
]

export default class Todo extends Component {

  constructor(props) {
    super(props)
    const cachedTasks = localStorage.getItem('todos')
    if (cachedTasks) {
      this.state = {
        todos: parseObject(cachedTasks)
      }
    } else {
      this.state = {
        todos: todos

      }
    }

  }

  render() {
    return (
      <div>

            <Row>
            <Grid>
              <h1>Todos</h1>

            <CreateTodo todos={this.state.todos} createTask={(i) => this.createTask(i)}/>
          </Grid>
          </Row>
          <Row>
            <Grid>

            <TodosList todos={this.state.todos} toggleTask={(i) => this.toggleTask(i)} saveTask={(i, v) => this.saveTask(i, v)} deleteTask={(i) => this.deleteTask(i)}/>
          </Grid>
          </Row>
      </div>
    )
  }
  updateLocalStore() {
    localStorage.setItem('todos', stringifyObject(this.state.todos))

  }

  toggleTask(id) {
    const foundTodo = _.find(this.state.todos, todo => todo.id === id)
    foundTodo.isComplete = !foundTodo.isComplete
    this.setState({todos: this.state.todos})
    this.updateLocalStore()

  }

  createTask(task) {
    this.state.todos.push({'id': uuid.v4(), task, isComplete: false})
    this.setState(({todos: this.state.todos}))
    this.updateLocalStore()
  }

  saveTask(oldTaskId, newTask) {
    const foundTodo = _.find(this.state.todos, todo => todo.id === oldTaskId)
    foundTodo.task = newTask
    this.setState({todos: this.state.todos})
    this.updateLocalStore()
  }

  deleteTask(taskToDeleteId) {
    _.remove(this.state.todos, todo => todo.id === taskToDeleteId)
    this.setState({todos: this.state.todos})
    this.updateLocalStore()

  }

}
