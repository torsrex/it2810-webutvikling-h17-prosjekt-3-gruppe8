import _ from 'lodash'
import React, {Component} from 'react'
import TodosListItem from './todos-list-item'

export default class TodosList extends Component {

  renderItems() {
    const props = _.omit(this.props, 'todos')

    return _.map(this.props.todos, (todo, index) => <TodosListItem key={index} {...todo} {...props}/>)
  }

  render() {
    return (
      <div>
          {this.renderItems()}
      </div>
    )
  }
}
