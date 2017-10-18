/*
Renders the list of all todos,
and creates every single individual todo based on the list in index.js.
*/

import _ from 'lodash'
import React, {Component} from 'react'
import TodosListItem from './todos-list-item'
import {} from 'react-bootstrap'

export default class TodosList extends Component {

  renderItems() {
    const props = _.omit(this.props, 'todos')
    //Creates a list of "todos-list-item" components
    return _.map(this.props.todos, (todo, id) =>
      <TodosListItem key={id} {...todo} {...props}/>)
  }

  render() {
    return (
      <div className="component-wrapper todo-list">
        {this.renderItems()}
      </div>
    )
  }
}
