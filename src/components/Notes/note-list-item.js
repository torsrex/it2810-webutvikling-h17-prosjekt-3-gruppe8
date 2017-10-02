import React, {Component} from 'react'

export default class NoteListItem extends Component{

  renderItems(){
    return (
      <p>{this.props.noteTxt}</p>
    )
  }

  render() {
    return(
      <div className="singleNote" style={{display:"flex", justifyContent:"center"}}>
        {this.renderItems()}
      </div>
    )
  }

}
