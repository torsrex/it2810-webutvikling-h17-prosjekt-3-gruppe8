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

  renderContactSection() {

    const {name, email, number} = this.props;

    const contactStyle = {

    };

    if (this.state.isEditing) {

      return (
        <div>
          <form onSubmit={(i) => this.onSaveClick(i)}>
            <FormGroup>
              <FormControl type="text" defaultValue={name} inputRef={(ref) => {
                this.inputName = ref
              }}/>
              <FormControl type="text" defaultValue={email} inputRef={(ref) => {
                  this.inputEmail = ref
              }}/>
              <FormControl type="text" defaultValue={number} inputRef={(ref) => {
                  this.inputNumber = ref
              }}/>
            </FormGroup>
          </form>
        </div>
      )
    }

    return (
      <div className="renderTaskSection" style={contactStyle}>
        <Well bsSize="sm">
          {name}<br />
          {email}<br />
          {number}
        </Well>
      </div>
    )
  }

  renderActionsSection() {
    if (this.state.isEditing) {
      return (
        <div>
          <OverlayTrigger placement="top" overlay={< Tooltip id = "tooltip" > <strong>Save todo</strong> < /Tooltip>}>
            <Button bsStyle="success">
              <span onClick={(i) => this.onSaveClick(i)} className="glyphicon glyphicon-ok"></span>
            </Button>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={< Tooltip id = "tooltip" > <strong>Cancel edit</strong> < /Tooltip>}>
            <Button bsStyle="danger">
              <span onClick={(i) => this.onCancelClick(i)} className="glyphicon glyphicon-remove"></span>
            </Button>
          </OverlayTrigger>
        </div>
      )
    }
    return (
      <div>
        <OverlayTrigger placement="top" overlay={< Tooltip id = "tooltip" > <strong>Edit</strong> < /Tooltip>}>
          <Button bsStyle="info">
            <span onClick={(i) => this.onEditClick(i)} className="glyphicon glyphicon-edit move"></span>
          </Button>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={< Tooltip id = "tooltip" > <strong>Delete</strong> < /Tooltip>}>
          <Button bsStyle="danger">
            <span onClick={(i) => this.props.deleteContact(this.props.id)} className="glyphicon glyphicon-trash deleteTask"></span>
          </Button>
        </OverlayTrigger>
      </div>
    )
  }
  render() {
    return (
      <Row className="fillWidth">
        <Col md={11} xs={10}>
          {this.renderContactSection()}
        </Col>
        <Col>
          {this.renderActionsSection()}
        </Col>
      </Row>
    )
  }
  onEditClick() {
    this.setState({isEditing: true})
  }
  onCancelClick() {
    this.setState({isEditing: false})
  }
  onSaveClick(event) {
    event.preventDefault();

    const oldTaskId = this.props.id;
    const newName = this.inputName.value;
    const newEmail = this.inputEmail.value;
    const newNumber = this.inputNumber.value;

    this.props.saveContact(oldTaskId, newName, newEmail, newNumber);
    this.setState({isEditing: false})

  }

}
