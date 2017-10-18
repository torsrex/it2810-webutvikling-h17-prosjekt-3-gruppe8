import React from 'react';
import _ from 'lodash'
import { Text, View, AsyncStorage } from 'react-native';
import CreateTodo from './create-todo'
import TodosList from './todos-list'
import uuid from 'uuid'
import {Content} from 'native-base'
import {parseObject, stringifyObject} from '../../utils'


//Default list of todos on first app load
const todos = [

]


export default class Todo extends React.Component {
  constructor(props){
    super()
    this.state = {
      todos: todos
    }
  }
  //Fetches notes from async storage
  componentWillMount = () => {
    AsyncStorage.getItem("todos")
      .then(todos => todos && this.setState({todos: parseObject(todos)}))
      .catch(e => console.log(e))
  }
    updateAsyncStore() {
      AsyncStorage.setItem('todos', stringifyObject(this.state.todos))
    }

    createTask(task){
      this.state.todos.push({'id': uuid.v4(), task, isComplete: false})
      this.setState(({todos: this.state.todos}))
      this.updateAsyncStore()
    }
    deleteTask(id){
      //Finds todo with corresponding id and removes it
      _.remove(this.state.todos, todo => todo.id === id)
      this.setState({todos: this.state.todos})
      this.updateAsyncStore()
    }
    //finds todo to update task of and saves it
    saveTask(oldTaskId, newTask) {
      const foundTodo = _.find(this.state.todos, todo => todo.id === oldTaskId)
      foundTodo.task = newTask
      this.setState({todos: this.state.todos})
      this.updateAsyncStore()
    }
    toggleTask(id) {
      //Flips isComplete flag
      const foundTodo = _.find(this.state.todos, todo => todo.id === id)
      foundTodo.isComplete = !foundTodo.isComplete
      this.setState({todos: this.state.todos})
      this.updateAsyncStore()
    }


  render(){
    return(
      //Always return a view at the start and bottom
      <Content>
        {/*Createtodo on top*/}
        <CreateTodo createTask={(i) => this.createTask(i)} />
        {/*Todolist under createtod*/}
        <TodosList
          todos={this.state.todos}
          deleteTask={(id) => this.deleteTask(id)}
          saveTask={(oldTaskId,newTask) => this.saveTask(oldTaskId,newTask)}
          toggleTask={(id) => this.toggleTask(id)}/>
      </Content>
    )
  }
}
