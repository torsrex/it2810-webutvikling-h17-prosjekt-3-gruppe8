import _ from 'lodash'
import React, {Component} from 'react'
import TodosList from './todos-list'
import CreateTodo from './create-todo'
import {parseObject, updateLocalStorage} from '../../utils'


import uuid from 'uuid'


export default class Todo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      todos: []
    }
  }

  componentDidMount() {
    const cachedTasks = localStorage.getItem('todos')
    this.setState({
      todos: cachedTasks ? parseObject(cachedTasks) : []
    })
  }

  toggleTask(id) {
    const {todos} = this.state
    const foundTodo = _.find(todos, todo => todo.id === id)
    foundTodo.isComplete = !foundTodo.isComplete
    this.setState({todos}, () => updateLocalStorage("todos", todos)
  )}

  createTask(task) {
    const {todos} = this.state
    todos.push({'id': uuid.v4(), task, isComplete: false})
    this.setState(({todos}), () => updateLocalStorage("todos", todos))}

  saveTask(id, newTask) {
    const {todos} = this.state
    const foundTodo = _.find(todos, todo => todo.id === id)
    foundTodo.task = newTask
    this.setState({todos}, () =>
    updateLocalStorage("todos", todos)
  )}

  deleteTask(id) {
    let {todos} = this.state
    todos = todos.filter(todo => todo.id !== id)
    this.setState({todos}, () =>
    updateLocalStorage("todos", todos)
  )}

  render() {
    const {todos} = this.state
    return (
      <div>
        <div className="componentMainDiv">
          <CreateTodo todos={todos} createTask={i => this.createTask(i)}/>
        </div>
        <div className="componentMainDiv contentMainDiv">
          <h2 className="centerText">Todo List</h2>
          <hr/>
          <TodosList
            todos={todos}
            toggleTask={i => this.toggleTask(i)}
            saveTask={(i, v) => this.saveTask(i, v)}
            deleteTask={i => this.deleteTask(i)}/>
        </div>
      </div>
    )
  }

}
