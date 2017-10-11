import React from 'react';
import _ from 'lodash'
import { StyleSheet, Text, View, Button } from 'react-native';

import CreateNote from './create-note'  //Import file
import NoteList from './note-list'      //Import file
import uuid from 'uuid'

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

export default class Notes extends React.Component {
  constructor(props) {
    super()
    this.state = {
      notes: notes
    }
  }


  render(){
    return (
      <View>
        <CreateNote notes={this.state.notes} createTask={(title,text) => this.createTask(title,text)}/>
        <NoteList notes={this.state.notes} deleteTask={(taskId) => this.deleteTask(taskId)} saveNote={(id,state) => this.saveNote(id,state)}/>
      </View>
    )
  }

  //create new note
  createTask(noteTitle, noteTxt) {
    this.state.notes.push({'id': uuid.v4(), noteTitle, noteTxt})
    this.setState(({notes: this.state.notes}))
  }

  deleteTask(taskToDeleteId){
    //Removes the state with id "taskToDeleteId" from notes, then updates the state.
    _.remove(this.state.notes, note => note.id === taskToDeleteId)
    this.setState({notes: this.state.notes})
  }
  //save changes on an existing note
  saveNote(noteId, noteState){
    //Finds the right note, and updates the title & txt of that note.
    const foundNote = _.find(this.state.notes, note => note.id === noteId)
    foundNote.noteTitle = noteState.noteTitle
    foundNote.noteTxt = noteState.noteTxt
    this.setState({notes: this.state.notes})
  }
}
