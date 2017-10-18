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
    if (this.notEmpty(newTask)) {
      this.props.saveTask(oldTaskId, newTask)
      this.setState({isEditing: false})
    }
  }

  //VALIDATION
  //Checks if the note content is empty
  notEmpty(newTask) {
    if (newTask) {
      return true
    } else {
      return false
    }
  }

  //Render functions ----------------------------------------------------------
  //todo content + toggle finished state
  renderTaskSection() {
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

    //The todo content (title/txt)
    if (this.state.isEditing) {
      return (
        <div>
          <form onSubmit={() => this.onSaveClick()}>
            <FormGroup>
              <FormControl
                type="text"
                defaultValue={task}
                inputRef={(ref) => {this.input = ref}}
              />

            </FormGroup>
          </form>
        </div>
      )
    }
    //Unless isEditing is true, return this
    return (
      <div
        className="render-task-section"
        style={taskStyle}
        onClick={() => this.props.toggleTask(id)}
        >
        <Well bsSize="sm">
          {task}
        </Well>
      </div>
    )
  }

  //buttons for modifying the todo content
  renderActionsSection() {
    if (this.state.isEditing) {
      return (
        <div>
          <OverlayTrigger
            placement="top"
            overlay={< Tooltip id = "tooltip" >
              <strong>Save todo</strong>
              < /Tooltip>}>
            <Button
              className="glyphicon glyphicon-ok move"
              onClick={() => this.onSaveClick()}
            />
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            overlay={< Tooltip id = "tooltip" >
              <strong>Cancel edit</strong>
              < /Tooltip>}>
            <Button
              className="glyphicon glyphicon-trash deleteTask"
              onClick={() => this.onCancelClick()}
            />
          </OverlayTrigger>
        </div>
      )
    }
    return (
      <div>
        <OverlayTrigger
          placement="top"
          overlay={< Tooltip id = "tooltip" >
            <strong>Edit</strong>
            < /Tooltip>}>
          <Button
            className="glyphicon glyphicon-edit move editClick"
            onClick={() => this.onEditClick()}
          />
        </OverlayTrigger>
        <OverlayTrigger
          placement="top"
          overlay={< Tooltip id = "tooltip" >
            <strong>Delete</strong>
            < /Tooltip>}>
          <Button
            className="glyphicon glyphicon-trash deleteTask"
            onClick={() => this.props.deleteTask(this.props.id)}/>
        </OverlayTrigger>
      </div>
    )
  }

  render() {
    return (
      <div>
        <Row className="fillWidth">
          <Col md={10} xs={10}>
            {this.renderTaskSection()}
          </Col>
          <Col>
            {this.renderActionsSection()}
          </Col>
        </Row>
      </div>
    )
  }
}
