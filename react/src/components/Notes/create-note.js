/*
Component that renders the form for creating new notes.
Handles creation/validation of new notes.
*/

import React, {Component} from 'react'
import {FormGroup, FormControl, Button} from 'react-bootstrap'

export default class CreateNote extends Component{
  constructor(props){
    super(props)
    this.state = {
      error: null
    }
  }


  //Create note function
  handleCreate(event) {
    event.preventDefault()
    const createTitle = this.inputTitle //get values from the form fields
    const createInput = this.inputText
    const noteTitle = String.prototype.trim.call(createTitle.value) //Strip to only text
    const noteTxt = String.prototype.trim.call(createInput.value)
    const notEmpty = this.notEmpty(noteTitle, noteTxt) //Input validation
    if (notEmpty){
      this.props.createTask(noteTitle, noteTxt) //create the task
      this.setState({error: null})
      //Reset the input fields after successfull submit
      this.inputTitle.value = ''
      this.inputText.value = ''
    } else{
      this.setState({error: "Please enter a title and a note text"})
    }
  }
  notEmpty(noteTitle, noteTxt){
    if(noteTitle && noteTxt){
      return true
    }else{
      return false
    }
  }
  //Renders the error message, if any.
  renderError(){
    if(!this.state.error){
      return null
    } else{
      return <div className="centerText redText">
      {this.state.error}
      </div>
    }
  }


  //Render the form create note
  render() {
    return(
      <div className="componentWrapper flexColumn">
        <h4 className="centerText whiteHeader">Create a note</h4>
        <form className="textAreaForm" onSubmit={this.handleCreate.bind(this)}>
          <FormGroup>
            <FormControl type="input" placeholder="Note title" inputRef={(ref) => {
              this.inputTitle = ref
            }}/>
            <FormControl componentClass="textarea" placeholder="Note text" rows="4" inputRef={(ref) => {
              this.inputText = ref
            }}/>
            <Button block type="submit">add</Button>
            {this.renderError()}
          </FormGroup>
        </form>
      </div>
    )
  }
}
