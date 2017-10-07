import _ from 'lodash'
import React, {Component} from 'react'
import NoteListItem from './note-list-item'

export default class NoteList extends Component {

  renderItems() {
    const props = _.omit(this.props, 'notes') //Removes notes from props
    return _.map(this.props.notes, (note, id) => <NoteListItem key={id} {...note} {...props}/>)
  }

  render() {
    return(
      //Renders the note LIST itself
      <div className="componentWrapper noteListWrapper noteList ">
        {this.renderItems()}
      </div>
    )
  }
}
