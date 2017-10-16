/* Main component for the todo page. Renders sub-components
and contains functions for manipulating the page data (todo list items)*/

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

  //Regular functions
  //Toggle if a todo is completed or not
  toggleTask(id) {
    const {todos} = this.state
    const foundTodo = _.find(todos, todo => todo.id === id)
    foundTodo.isComplete = !foundTodo.isComplete
    this.setState({todos}, () => updateLocalStorage("todos", todos)
  )}

  //Create new todo
  createTask(task) {
    const {todos} = this.state
    todos.unshift({'id': uuid.v4(), task, isComplete: false})
    this.setState(({todos}), () => updateLocalStorage("todos", todos))}

  //Save todo after changes have been made
  saveTask(id, newTask) {
    const {todos} = this.state
    const foundTodo = _.find(todos, todo => todo.id === id)
    foundTodo.task = newTask
    this.setState({todos}, () =>
    updateLocalStorage("todos", todos)
  )}

  //Delete todo
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
        <div className="component-main-div">
          <CreateTodo todos={todos} createTask={i => this.createTask(i)}/>
        </div>
        <div className="component-main-div content-main-div">
          <h2 className="center-text">Todo List</h2>
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
