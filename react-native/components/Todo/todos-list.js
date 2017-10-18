import React from 'react';
import {ScrollView} from 'react-native';
import TodosListItem from './todos-list-item'

export default class TodosList extends React.Component {

  render() {
    return (
      <ScrollView style={{
        margin: 10
      }}>
        {this.props.todos.map((todo, index) => {
          return <TodosListItem
            key={todo.id}
            task={todo.task}
            id={todo.id}
            isComplete={todo.isComplete}
            deleteTask={(id) => this.props.deleteTask(id)}
            saveTask={(oldTaskId, newTask) => this.props.saveTask(oldTaskId, newTask)}
            toggleTask={(id) => this.props.toggleTask(id)}/>
        })}
      </ScrollView>
    )
  }
}
