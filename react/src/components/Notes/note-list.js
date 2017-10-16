/*
Renders the list of all notes,
and creates every single individual note based on the list in index.js.
*/

import _ from 'lodash'
import React, {Component} from 'react'
import NoteListItem from './note-list-item'

export default class NoteList extends Component {

  renderItems() {
    const props = _.omit(this.props, 'notes') //Removes notes from props
    //Creates a list of all note-list-item components
    return _.map(this.props.notes, (note, id) => <NoteListItem key={id} {...note} {...props}/>)
  }

  render() {
    return(
      //Renders the note list itself, and puts all note list items in it
      <div className="component-wrapper note-list ">
        {this.renderItems()}
      </div>
    )
  }
}
