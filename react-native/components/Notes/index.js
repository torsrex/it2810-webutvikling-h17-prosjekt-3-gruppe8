import React from 'react';
import _ from 'lodash'
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';

import CreateNote from './create-note'  //Import file
import NoteList from './note-list'      //Import file
import uuid from 'uuid'
import {parseObject, stringifyObject} from '../../utils'

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
  }
]

export default class Notes extends React.Component {
  constructor(props) {
    super()
    this.state = {
      notes: notes
    }
  }

  componentWillMount = () => {
    AsyncStorage.getItem("notes")
      .then(notes => notes && this.setState({notes: parseObject(notes)}))
      .catch(e => console.log(e))
  }
  updateAsyncStore() {
    AsyncStorage.setItem('notes', stringifyObject(this.state.notes))
  }

    //create new note
    createTask(noteTitle, noteTxt) {
      this.state.notes.push({'id': uuid.v4(), noteTitle, noteTxt})
      this.setState(({notes: this.state.notes}))
      this.updateAsyncStore()
    }

    deleteTask(taskToDeleteId){
      //Removes the state with id "taskToDeleteId" from notes, then updates the state.
      _.remove(this.state.notes, note => note.id === taskToDeleteId)
      this.setState({notes: this.state.notes})
      this.updateAsyncStore()
    }
    //save changes on an existing note
    saveNote(noteId, noteState){
      //Finds the right note, and updates the title & txt of that note.
      const foundNote = _.find(this.state.notes, note => note.id === noteId)
      foundNote.noteTitle = noteState.noteTitle
      foundNote.noteTxt = noteState.noteTxt
      this.setState({notes: this.state.notes})
      this.updateAsyncStore()
    }


  render(){
    return (
      <View>
        <CreateNote notes={this.state.notes} createTask={(title,text) => this.createTask(title,text)}/>
        <NoteList notes={this.state.notes} deleteTask={(taskId) => this.deleteTask(taskId)} saveNote={(id,state) => this.saveNote(id,state)}/>
      </View>
    )
  }
}
