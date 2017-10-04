import _ from 'lodash'
import React, {Component} from 'react'
import NoteListItem from './note-list-item'

export default class NoteList extends Component {

  renderItems() {
    const props = _.omit(this.props, 'notes') //Removes notes from props
    return _.map(this.props.notes, (note, index) => <NoteListItem key={index} {...note} {...props}/>)
  }

  render() {
    return(
      //Renders the note LIST itself
      <div className="noteList">
        {this.renderItems()}
      </div>

    )
  }
}
