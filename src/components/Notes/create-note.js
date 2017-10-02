import _ from 'lodash'
import React, {Component} from 'react'

export default class CreateNote extends Component{
  constructor(props){
    super(props)
    this.state = {
      error: null
    }
  }
  //Error handling
  renderError(){
    if (!this.state.error) {
      return null
    }
    return <div>
    {this.state.error}</div>
  }
  //Render the form for creating the new note.
  render() {
    return(
      <form onSubmit={this.handleCreate.bind(this)}>
        <textarea id="addNoteTxtArea" placeholder="Add a note here" rows="6" cols="70" ref="createInput" />
        <button id="addNoteBtn" type="button">Add note</button>
        {this.renderError()}
        </form>
    )
  }
  //From here on, all code is to CREATE new notes
  handleCreate(event) {
    event.preventDefault()
    const createInput = this.refs.createInput
    const noteTxt = String.prototype.trim.call(createInput.value)

    //Error handling -----------------
    const validInput = this.validInput(noteTxt)
    if(validInput){
      this.setState({error: validInput})
      return
    }
    //end error handling

    this.setState({error: null})
    this.props.createTask(noteTxt)
    this.refs.createInput.value = ''
  }
  
  //More error handling ---------------
  validInput(noteTxt) {
    if (!noteTxt){
      return 'Please enter a note'
    } else if(_.find(this.props.notes, notes => notes.noteTxt === noteTxt)){
      return 'Note already exists'
    } else{
      return null
    }
  }
  //End more error handling
}
