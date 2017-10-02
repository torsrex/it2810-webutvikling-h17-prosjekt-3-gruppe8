import _ from 'lodash'
import React, {Component} from 'react'
import NoteListItem from './note-list-item'

export default class NoteList extends Component {

  renderItems() {
    const props = _.omit(this.props, 'notes')

    return _.map(this.props.notes, (note, index) => <NoteListItem key={index} {...note} {...props}/>)
  }

  render() {
    return(
      <div>
        <h3>Note list</h3>
        {this.renderItems()}
      </div>
    )
  }
}
