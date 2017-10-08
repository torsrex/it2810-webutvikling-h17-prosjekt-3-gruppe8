import _ from 'lodash'
import React, {Component} from 'react'  //"obligatory component import"
import uuid from 'uuid' //assigning unique IDs
import {stringifyObject, parseObject} from '../../utils'

import NoteList from './note-list'      //Import file
import CreateNote from './create-note'  //Import file


//Default content
const notes = [
  {
    id: uuid.v4(),
    noteTitle: '1st note:',
    noteTxt: 'First note is here'
  }, {
    id: uuid.v4(),
    noteTitle: '2st note:',
    noteTxt: 'Second note is here'
  },{
    id: uuid.v4(),
    noteTitle: '3rd note:',
    noteTxt: 'Third note is hereeeeeeee'
  },{
    id: uuid.v4(),
    noteTitle: '4th note:',
    noteTxt: 'Fourth note is here Fourth note is here'
  }, {
    id: uuid.v4(),
    noteTitle: '5thrd note:',
    noteTxt: 'this is a note. this is a note. this is a note. this is a note. this is a note. this is a note. '
  }
]

export default class Notes extends Component {

  constructor(props) {
    super(props);
    const cachedTasks = localStorage.getItem('notes')
    if (cachedTasks) {
      this.state = {
        notes: parseObject(cachedTasks)
      }
    } else {
      this.state = {
        notes: notes
      }
    }
  }

  render() {
    return(
      //Renders the header
      <div>
        <div className="componentMainDiv">
          <CreateNote notes={this.state.notes} createTask={(i,j) => this.createTask(i,j)}/>
        </div>
        <div className="componentMainDiv contentMainDiv">
          <h2 className="centerText">Note List</h2>
          <hr/>
          <NoteList notes={this.state.notes} deleteTask={(i) => this.deleteTask(i)} saveNote={(id,state) => this.saveNote(id,state)}/>
        </div>
      </div>
    )
  }
  updateLocalStore() {
    localStorage.setItem('notes', stringifyObject(this.state.notes))
  }

  createTask(noteTitle, noteTxt) {
    this.state.notes.push({'id': uuid.v4(), noteTitle, noteTxt})
    this.setState(({notes: this.state.notes}))
    this.updateLocalStore()
  }

  deleteTask(taskToDeleteId){
    //Removes the state with id "taskToDeleteId" from notes, then updates the state.
    _.remove(this.state.notes, note => note.id === taskToDeleteId)
    this.setState({notes: this.state.notes})
    this.updateLocalStore()
  }
  saveNote(noteId, noteState){
    //Finds the right note, and updates the title & txt of that note.
    const foundNote = _.find(this.state.notes, note => note.id === noteId)
    foundNote.noteTitle = noteState.noteTitle
    foundNote.noteTxt = noteState.noteTxt
    this.setState({notes: this.state.notes})
    this.updateLocalStore()
  }
}