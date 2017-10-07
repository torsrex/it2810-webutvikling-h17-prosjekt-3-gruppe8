import React, {Component} from 'react'

export default class CreateNote extends Component{
  constructor(props){
    super(props)
    this.state = {
      error: null
    }
  }

  //Render the form. Create new note
  render() {
    return(
      //Renders the submit form for creating list items
      <div className="componentWrapper flexColumn">
        <h1 className="centerText">Notes</h1>
        <form className="inputForm" onSubmit={this.handleCreate.bind(this)}>
          <input id="addNoteTitleTxtArea" placeholder="Add title" ref="createTitle" />
          <textarea id="addNoteTxtArea" placeholder="Add a note" rows="6" cols="70" ref="createInput" />
          <button>Add note</button>
          {this.renderError()}
        </form>
      </div>

    )
  }
  //From here on, all code is to create new notes
  handleCreate(event) {
    event.preventDefault()
    const createTitle = this.refs.createTitle //get values from the form fields
    const createInput = this.refs.createInput
    const noteTitle = String.prototype.trim.call(createTitle.value) //Strip to only text
    const noteTxt = String.prototype.trim.call(createInput.value)
    const validInput = this.validInput(noteTitle, noteTxt) //Input validation
    if (validInput){
      this.props.createTask(noteTitle, noteTxt) //create the task
      this.setState({error: null})
      //Reset the input fields after successfull submit
      this.refs.createTitle.value = ''
      this.refs.createInput.value = ''
    } else{
      this.setState({error: "Please enter a title and a note text"})
    }
  }
  validInput(noteTitle, noteTxt){
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
}
