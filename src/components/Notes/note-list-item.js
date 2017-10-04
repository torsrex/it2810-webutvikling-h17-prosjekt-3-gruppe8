import React, {Component} from 'react'

export default class NoteListItem extends Component{

  renderItems(){
    return (
      <div className="singleNote alignCenter">
        <div className="noteHeader">
          <button className="tinysize"/>
          <h4 className="alignCenter fillWidth">{this.props.noteTitle}</h4>
          <button className="tinysize"/>
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

}
