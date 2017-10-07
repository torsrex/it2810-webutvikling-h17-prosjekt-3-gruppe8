import React, {Component} from 'react'

export default class NoteListItem extends Component{
  constructor(props){
    super(props)
    this.state = {
      isEditing: false,
      noteTitle: this.props.noteTitle,
      noteTxt: this.props.noteTxt
    }
  }

  //Used to update state when component receives new props, doesn't happen automatically
  componentWillReceiveProps(nextProps) {
  // You don't have to do this check first, but it can help prevent an unneeded
  this.setState({ noteTitle: nextProps.noteTitle });
  this.setState({ noteTxt: nextProps.noteTxt });
  }

  renderItems(){
    if(this.state.isEditing){
      //renders editable note, replace "p" with "input", and add eventListener.------
      return (
        <div className="singleNote alignCenter">
          <div className="noteHeader">
            <button onClick={ () => this.onSaveClick() } className="glyphicon glyphicon-check move"/>
            <input value={this.state.noteTitle} onChange={ (e) => this.changeTitle(e) }  className="alignCenter fillWidth"></input>

            <button onClick={ () => this.onDeleteClick() } className="glyphicon glyphicon-trash deleteTask"/>
          </div>

          <textArea value={this.state.noteTxt} onChange={ (e) => this.changeTxt(e) } className="noteText" ></textArea>
        </div>
      )
    }
    //Renders the static note, no dynamic changes. -----------------------------------
    return (
      <div className="singleNote alignCenter">
        <div className="noteHeader">
          <button onClick={ () => this.onEditClick() } className="glyphicon glyphicon-edit move"/>
          <h4 className="centerText fillWidth">{this.state.noteTitle}</h4>

          {/* deletes the state with title "noteTitle". deleteTask is defined in index.js */}
          <button onClick={ () => this.onDeleteClick() }className="glyphicon glyphicon-trash deleteTask"/>
        </div>

        <p className="noteText">{this.state.noteTxt}</p>
      </div>
    )
  }


  render() {
    return(
      this.renderItems()
    )
  }

  //Change states when editing text fields
  changeTitle(e){
    this.setState({noteTitle: e.target.value})
  }
  changeTxt(e){
    this.setState({noteTxt: e.target.value})
  }

  onEditClick(){
    this.setState({isEditing: true})
  }
  onSaveClick(){
    //ADD: update note list in index.js on save.
    this.props.saveNote(this.props.id, this.state)
    this.setState({isEditing: false})
  }
  onDeleteClick(){
    this.props.deleteTask(this.props.id)
  }
}
