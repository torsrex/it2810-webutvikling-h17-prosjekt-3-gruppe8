import React, {Component} from 'react'

export default class NoteListItem extends Component{

  renderItems(){
    return (
      <p>{this.props.noteTxt}</p>
      //render button for removing list item here
      //render button for editing list item here
    )
  }

  render() {
    return(
      //Renders each individual list item in a div
      <div className="singleNote alignCenter">
        {this.renderItems()}
      </div>
    )
  }

}
