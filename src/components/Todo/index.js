import _ from 'lodash'
import React, {Component} from 'react'
import TodosList from './todos-list'
import CreateTodo from './create-todo'

const todos = [
  {
    task: 'First task is here',
    isComplete: true
  }, {
    task: 'Second task is here',
    isComplete: false
  }
]

export default class Todo extends Component {

  constructor(props) {
    super(props)
		const cachedTasks = localStorage.getItem('todos')
		console.log(cachedTasks)
		if (cachedTasks){
			this.state = {todos: JSON.parse(cachedTasks)}
		}else{
			this.state = {
				todos: todos

		}
    }

  }

  render() {
    return (
      <div>
        <h1>Todos</h1>
        <CreateTodo todos={this.state.todos} createTask={this.createTask.bind(this)}/>
        <TodosList todos={this.state.todos} createTask={this.createTask.bind(this)} toggleTask={this.toggleTask.bind(this)} saveTask={this.saveTask.bind(this)} deleteTask={this.deleteTask.bind(this)}/>
      </div>
    )
  }
	updateLocalStore(){
		localStorage.setItem('todos', JSON.stringify(this.state.todos))

	}

  toggleTask(task) {
    const foundTodo = _.find(this.state.todos, todo => todo.task === task)
    foundTodo.isComplete = !foundTodo.isComplete
    this.setState({todos: this.state.todos})
		this.updateLocalStore()

  }

  createTask(task) {
    this.state.todos.push({task, isComplete: false})
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
