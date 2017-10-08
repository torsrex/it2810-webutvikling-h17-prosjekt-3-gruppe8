import React from 'react';
import {StyleSheet, Text, View, Button, ScrollView} from 'react-native';
import {StackNavigator, TabNavigator} from 'react-navigation';
import TodosListItem from './todos-list-item'

export default class TodosList extends React.Component {


  render() {
    return (
      <ScrollView>
        {this.props.todos.map((todo, index) => {
          return <TodosListItem key={todo.id} task={todo.task} id={todo.id} isComplete={todo.isComplete} deleteTask={(i) => this.props.deleteTask(i)} saveTask={(i,v) => this.props.saveTask(i,v)} toggleTask={(i) => this.props.toggleTask(i)}/>
        })}
      </ScrollView>
    )
  }
}
