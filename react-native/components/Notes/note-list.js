import React from 'react';
import {  ScrollView } from 'react-native';
import NoteListItem from './note-list-item'


export default class NoteList extends React.Component {

  render(){
    return (
      <ScrollView>
        {this.props.notes.map((notes, index) => {
          return <NoteListItem
            key={notes.id}
            id={notes.id}
            noteTitle={notes.noteTitle}
            noteTxt={notes.noteTxt}
            deleteTask={(taskId) => this.props.deleteTask(taskId)}
            saveNote={(id,state) => this.props.saveNote(id,state)}/>
        })}
      </ScrollView>
    )
  }

}
