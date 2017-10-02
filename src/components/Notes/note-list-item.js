import React, {Component} from 'react'

export default class NoteListItem extends Component{
  constructor(props){
    super(props)
  }

  renderItems(){
    return (
      <div className="singleNote">
        <p>{this.props.noteTxt}</p>
      </div>
    )
  }

  render() {
    return(
      <div>
        {this.renderItems()}
      </div>
    )
  }

}
