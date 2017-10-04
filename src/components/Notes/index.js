import React, {Component} from 'react'  //"obligatory component import"
import NoteList from './note-list'      //Import file
import CreateNote from './create-note'  //Import file

//Default content
const notes = [
  {
    noteTitle: '1st note:',
    noteTxt: 'First note is here'
  }, {
    noteTitle: '2nd note:',
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
      //Renders the header
        <div className="notes-wrapper">
          <h1 className="centerH">Notes</h1>
          <CreateNote notes={this.state.notes} createTask={this.createTask.bind(this)}/>
          <NoteList notes={this.state.notes} createTask={this.createTask.bind(this)} deleteTask={this.deleteTask.bind(this)}/>
        </div>
    )
  }

  createTask(noteTitle, noteTxt) {

    this.state.notes.push({noteTitle, noteTxt})
    this.setState(({notes: this.state.notes}))
    console.log(this.state.notes)
    //this.updateLocalStore()
  }

  deleteTask(taskToDelete){
    //Removes the state with title "taskToDelete" from notes, then updates the state. 
    _.remove(this.state.notes, note => note.noteTitle === taskToDelete)
    this.setState({notes: this.state.notes})
  }
}
