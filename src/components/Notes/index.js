import _ from 'lodash'
import React, {Component} from 'react'
import CreateNote from './create-note.js'

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
        <div>
          <h1>Notes</h1>
          <CreateNote notes={this.state.notes} createTask={this.createTask.bind(this)}/>
          <div className="notesView">
          </div>
        </div>
    )
  }

  updateLocalStore() {
    //localStorage.setItem('notes', stringifyObject(this.state.notes))
  }

  createTask(noteTxt) {
    this.state.notes.push({noteTxt})
    this.setState(({notes: this.state.notes}))
    //this.updateLocalStore()
  }


}
