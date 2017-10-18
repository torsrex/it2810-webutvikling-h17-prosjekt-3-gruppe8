/*
A single contact.
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

export default class ContactListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    }
  }
  //Change edit state to true
  onEditClick() {
    this.setState({isEditing: true})
  }
  //Change edit state to false
  onCancelClick() {
    this.setState({isEditing: false})
  }
  //Save content of the edited contact-list-item.
  onSaveClick(event) {
    const oldTaskId = this.props.id;
    const newName = this.inputName.value;
    const newEmail = this.inputEmail.value;
    const newNumber = this.inputNumber.value;
    if (this.notEmpty(newName, newEmail, newNumber)) {
      this.props.saveContact(oldTaskId, newName, newEmail, newNumber);
      this.setState({isEditing: false})
    }
  }

  //VALIDATION
  //Checks if the note content is empty
  notEmpty(newName, newEmail, newNumber) {
    if (newName && newEmail && newNumber) {
      return true
    } else {
      return false
    }
  }

  //Render function
  renderContactSection() {
    const {name, email, number} = this.props;
    const contactStyle = {};
    //Render this if contact is being edited
    if (this.state.isEditing) {

      return (
        <div>
          <form onSubmit={() => this.onSaveClick()}>
            <FormGroup>
              <FormControl type="text" defaultValue={name}
                inputRef={(ref) => {this.inputName = ref}}
            />
              <FormControl type="text" defaultValue={email}
                inputRef={(ref) => {this.inputEmail = ref}}
            />
              <FormControl type="text" defaultValue={number}
                inputRef={(ref) => {this.inputNumber = ref}}
            />
            </FormGroup>
          </form>
        </div>
      )
    }
    //Render this otherwise
    return (
      <div className="render-task-section" style={contactStyle}>
        <Well bsSize="sm">
          {name}<br/> {email}<br/> {number}
        </Well>
      </div>
    )
  }
  //Render function for action buttons (Save/cancel/delete)
  renderActionsSection() {
    if (this.state.isEditing) {
      return (
        <div>
          <OverlayTrigger
            placement="top"
            overlay={< Tooltip id = "tooltip" >
              <strong>Save todo</strong>
              < /Tooltip>}>
            <Button className="glyphicon glyphicon-ok move"
              onClick={() => this.onSaveClick()}/>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            overlay={< Tooltip id = "tooltip" >
              <strong>Cancel edit</strong>
              < /Tooltip>}>
            <Button className="glyphicon glyphicon-trash deleteTask"
              onClick={() => this.onCancelClick()}/>
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
          <Button className="glyphicon glyphicon-edit move"
            onClick={() => this.onEditClick()}/>
        </OverlayTrigger>
        <OverlayTrigger
          placement="top"
          overlay={< Tooltip id = "tooltip" >
            <strong>Delete</strong>
            < /Tooltip>}>
          <Button className="glyphicon glyphicon-trash deleteTask"
            onClick={() => this.props.deleteContact(this.props.id)}/>
        </OverlayTrigger>
      </div>
    )
  }
  render() {
    return (
      <Row className="fill-width">
        <Col xs={11}>
          {this.renderContactSection()}
        </Col>
        <Col xs={1}>
          {this.renderActionsSection()}
        </Col>
      </Row>
    )
  }
}
