import React from 'react';
import _ from 'lodash'
import { StyleSheet, Text, View, Button } from 'react-native';
import CreateTodo from './create-todo'
import TodosList from './todos-list'
import uuid from 'uuid'


//Default list of todos on first app load
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

//TODO: Add async storage instead of localStorage

export default class Todo extends React.Component {
  constructor(props){
    super()
    this.state = {
      todos: todos
    }
  }


  render(){
    return(
      //Always return a view at the start and bottom
      <View style={styles.mainContainer}>
        {/*Createtodo on top*/}
      <CreateTodo todos={this.state.todos} createTask={(i) => this.createTask(i)} />
      {/*Todolist under createtod*/}
      <TodosList todos={this.state.todos} deleteTask={(i) => this.deleteTask(i)} saveTask={(i,v) => this.saveTask(i,v)} toggleTask={(i) => this.toggleTask(i)}/>
    </View>
    )
  }

  createTask(task){
    this.state.todos.push({'id': uuid.v4(), task, isComplete: false})
    this.setState(({todos: this.state.todos}))
  }
  deleteTask(taskToDeleteId){
    //Finds todo with corresponding id and removes it
    _.remove(this.state.todos, todo => todo.id === taskToDeleteId)
    this.setState({todos: this.state.todos})
  }
  //finds todo to update task of and saves it
  saveTask(oldTaskId, newTask) {
    const foundTodo = _.find(this.state.todos, todo => todo.id === oldTaskId)
    foundTodo.task = newTask
    this.setState({todos: this.state.todos})
  }
  toggleTask(id) {
    //Flips isComplete flag
    const foundTodo = _.find(this.state.todos, todo => todo.id === id)
    foundTodo.isComplete = !foundTodo.isComplete
    this.setState({todos: this.state.todos})
  }

}
//Custom styling
const styles = StyleSheet.create({
   mainContainer: {
      marginTop: 10,
      marginLeft: 5,
      marginRight: 5,
      flex: 1,
      flexDirection: 'column',
      justifyContent:'center'
   }
})
