/* Main component for the note page. Renders sub-components
and contains functions for manipulating the page data (note list items)*/

import _ from 'lodash'
import React, {Component} from 'react'  //"obligatory component import"
import uuid from 'uuid' //assigning unique IDs
import {parseObject, updateLocalStorage} from '../../utils'

import NoteList from './note-list'      //Import file
import CreateNote from './create-note'  //Import file

export default class Notes extends Component {

  constructor(props) {
    super(props)
    this.state = {
      notes: []
    }
  }

  //When the component is mounted, get tasks from localstorage (if there are any)
  componentDidMount() {
    //localStorage.clear() //uncomment to get the default list of notes
    const cachedTasks = localStorage.getItem('notes')
    this.setState({
      notes: cachedTasks ? parseObject(cachedTasks) : []
    })
  }

  //create new note
  createTask(noteTitle, noteTxt) {
    const {notes} = this.state
    notes.unshift({'id': uuid.v4(), noteTitle, noteTxt})
    this.setState({notes}, () => updateLocalStorage("notes", notes))
  }
  //Delete selected note
  deleteTask(taskToDeleteId){
    const {notes} = this.state
    //Removes the state with id "taskToDeleteId" from notes, then updates the state.
    _.remove(notes, note => note.id === taskToDeleteId)
    this.setState({notes}, () => updateLocalStorage("notes", notes))
  }
  //save changes on an existing note
  saveNote(noteId, noteState){
    const {notes} = this.state
    //Finds the right note, and updates the title & txt of that note.
    const foundNote = _.find(notes, note => note.id === noteId)
    foundNote.noteTitle = noteState.noteTitle
    foundNote.noteTxt = noteState.noteTxt
    this.setState({notes}, () => updateLocalStorage("notes", notes))
  }

  render() {
    return(
      <div>
        {/*renders the display image, along with the form for creating notes*/}
        <div className="component-main-div">
          <CreateNote notes={this.state.notes} createTask={(title,text) => this.createTask(title,text)}/>
        </div>
        {/*renders the list of notes*/}
        <div className="component-main-div content-main-div">
          <h2 className="center-text">Note List</h2>
          <hr/>
          <NoteList notes={this.state.notes} deleteTask={(taskId) => this.deleteTask(taskId)} saveNote={(id,state) => this.saveNote(id,state)}/>
        </div>
      </div>
    )
  }
}
