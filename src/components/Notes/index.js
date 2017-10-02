import _ from 'lodash'
import React, {Component} from 'react'  //"obligatory component import"
import NoteList from './note-list'      //Import file
import CreateNote from './create-note'  //Import file

//Default content
const notes = [
  {
    noteTxt: 'First note is here'
  }, {
    noteTxt: 'Second note is here'
  }
]

export default class Notes extends Component {

  constructor(props) {
    super(props);

    this.state = {
      notes: notes
    }

  }


  render() {

    return(
        <div className="notes-wrapper">
          <CreateNote notes={this.state.notes} createTask={this.createTask.bind(this)}/>
          <NoteList notes={this.state.notes} createTask={this.createTask.bind(this)}/>
          <div className="notesView">
          </div>
        </div>
    )
  }

  createTask(noteTxt) {
    this.state.notes.push({noteTxt})
    this.setState(({notes: this.state.notes}))
    console.log(this.state.notes)
    //this.updateLocalStore()

  }
}
