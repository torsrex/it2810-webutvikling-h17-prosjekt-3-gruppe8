import React, {Component} from 'react'

export default class NoteListItem extends Component{
  constructor(props){
    super(props)
    console.log(props)
  }

  renderItems(){
    return (
      <div className="singleNote alignCenter">
        <div className="noteHeader">
          <button onClick={this.onEditClick.bind(this)} className="tinysize"/>
          <h4 className="alignCenter fillWidth">{this.props.noteTitle}</h4>
          {/* deletes the state with title "noteTitle". deleteTask is defined in index.js */}
          <button onClick={this.props.deleteTask.bind(this, this.props.noteTitle)}className="tinysize">X</button>
        </div>

        <p className="noteText">{this.props.noteTxt}</p>

      </div>
    )
  }


  render() {
    return(
      //Renders each individual list item in a div
      this.renderItems()
    )
  }

  onEditClick(){
    //make paragraphs editable
  }

}
