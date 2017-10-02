import _ from 'lodash'
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
      <form onSubmit={this.handleCreate.bind(this)} className="noteForm alignCenter ">
        <textarea id="addNoteTxtArea" placeholder="Add a note" rows="6" cols="70" ref="createInput" />
        <button>Add note</button>
      </form>
    )
  }
  //From here on, all code is to create new notes
  handleCreate(event) {
    event.preventDefault()
    const createInput = this.refs.createInput
    const noteTxt = String.prototype.trim.call(createInput.value)

    this.setState({error: null})
    this.props.createTask(noteTxt)
    this.refs.createInput.value = ''
  }
}
