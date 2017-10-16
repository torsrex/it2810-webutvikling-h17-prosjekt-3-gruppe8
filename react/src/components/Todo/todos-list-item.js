/*
A single todo.
Contains functions for manipulating it, and deleting it.
*/

import React, {Component} from 'react'
import {
  Row,
  Col,
  FormGroup,
  FormControl,
  Well,
  OverlayTrigger,
  Tooltip,
  Button
} from 'react-bootstrap'

export default class TodosListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false
    }
  }

  //Regular functions ---------------------------------------------------------
  onEditClick() {
    this.setState({isEditing: true})
  }
  onCancelClick() {
    this.setState({isEditing: false})
  }
  onSaveClick(event) {
    const oldTaskId = this.props.id
    const newTask = this.input.value
    //only save changes if todo content isn't empty
    if(this.notEmpty(newTask)){
      this.props.saveTask(oldTaskId, newTask)
      this.setState({isEditing: false})
    }
  }

  //VALIDATION
  //Checks if the note content is empty
  notEmpty(newTask){
    if(newTask){
      return true
    }else{
      return false
    }
  }

  //Render functions ----------------------------------------------------------
  renderTaskSection() { //todo content + toggle finished state
    const {id, task, isComplete} = this.props
    const taskStyle = {
      color: isComplete
        ? 'green'
        : 'red',
      textDecorationLine: isComplete
        ? 'line-through'
        : '',
      cursor: 'pointer'
    }

    if (this.state.isEditing) { //The todo content (title/txt)
      return (
        <div>
          <form onSubmit={(i) => this.onSaveClick(i)}>
            <FormGroup>
              <FormControl type="text" defaultValue={task} inputRef={(ref) => {
                this.input = ref
              }}/>

            </FormGroup>
          </form>
        </div>
      )
    }
    //Unless isEditing is true, return this
    return (
      <div className="render-task-section" style={taskStyle} onClick={() => this.props.toggleTask(id)}>
        <Well bsSize="sm">
          {task}
        </Well>
      </div>
    )
  }

  renderActionsSection() { //buttons for modifying the todo content
    if (this.state.isEditing) {
      return (
        <div>
          <OverlayTrigger placement="top" overlay={< Tooltip id = "tooltip" > <strong>Save todo</strong> < /Tooltip>}>
            <Button className="glyphicon glyphicon-ok move" onClick={(i) => this.onSaveClick(i)}/>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={< Tooltip id = "tooltip" > <strong>Cancel edit</strong> < /Tooltip>}>
            <Button className="glyphicon glyphicon-trash deleteTask" onClick={(i) => this.onCancelClick(i)}/>
          </OverlayTrigger>
        </div>
      )
    }
    return (
      <div>
        <OverlayTrigger placement="top" overlay={< Tooltip id = "tooltip" > <strong>Edit</strong> < /Tooltip>}>
          <Button className="glyphicon glyphicon-edit move" onClick={(i) => this.onEditClick(i)}/>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={< Tooltip id = "tooltip" > <strong>Delete</strong> < /Tooltip>}>
          <Button className="glyphicon glyphicon-trash deleteTask" onClick={(i) => this.props.deleteTask(this.props.id)}/>
        </OverlayTrigger>
      </div>
    )
  }

  render() {
    return (
      <Row className="fill-width">
        <Col md={10} xs={10}>
          {this.renderTaskSection()}
        </Col>
        <Col>
          {this.renderActionsSection()}
        </Col>
      </Row>
    )
  }
}
