import _ from 'lodash'
import React, {Component} from 'react'
import TodosList from './todos-list'
import CreateTodo from './create-todo'
import {stringifyObject, parseObject} from '../../utils'
import {Grid, Row, Col} from 'react-bootstrap'
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
      <div className="todo-wrapper">
        <Grid>
          <Row>
            <Col md={6}></Col>

            <h1>Todos</h1>
            <CreateTodo todos={this.state.todos} createTask={this.createTask.bind(this)}/>
            <TodosList todos={this.state.todos} createTask={this.createTask.bind(this)} toggleTask={this.toggleTask.bind(this)} saveTask={this.saveTask.bind(this)} deleteTask={this.deleteTask.bind(this)}/>
          </Row>
        </Grid>
      </div>
    )
  }
  updateLocalStore() {
    localStorage.setItem('todos', stringifyObject(this.state.todos))

  }

  toggleTask(task) {
    const foundTodo = _.find(this.state.todos, todo => todo.task === task)
    foundTodo.isComplete = !foundTodo.isComplete
    this.setState({todos: this.state.todos})
    this.updateLocalStore()

  }

  createTask(task) {
    this.state.todos.push({'id':uuid.v4(), task, isComplete: false})
    this.setState(({todos: this.state.todos}))
    this.updateLocalStore()
  }

  saveTask(oldTask, newTask) {
    const foundTodo = _.find(this.state.todos, todo => todo.task === oldTask)
    foundTodo.task = newTask
    this.setState({todos: this.state.todos})
    this.updateLocalStore()
  }

  deleteTask(taskToDelete) {
    _.remove(this.state.todos, todo => todo.task === taskToDelete)
    this.setState({todos: this.state.todos})
    this.updateLocalStore()

  }

}
