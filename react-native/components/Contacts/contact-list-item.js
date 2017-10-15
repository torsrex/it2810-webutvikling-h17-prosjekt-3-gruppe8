import React from 'react';
import {View} from 'react-native';
import {
  Button,
  Label,
  Text,
  Card,
  CardItem,
  Body,
  Input,
  Item,
  Form
} from 'native-base'
import {StackNavigator, TabNavigator} from 'react-navigation';

export default class ContactListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      tempName: "",
      tempEmail: "",
      tempNumber: ""
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
          <Button className="glyphicon glyphicon-trash deleteTask" onClick={(i) => this.props.deleteContact(this.props.id)}/>
        </OverlayTrigger>
      </div>
    )
  }
  render() {
    return (
      <Card style={{
        alignItems: 'center'
      }}>
        <CardItem>
          {this.renderContactSection()}
        </CardItem>
        <CardItem style={{
          flexDirection: 'row'
        }}>
          {this.renderActionsSection()}
        </CardItem>
      </Card>
      /*
      <Row className="fillWidth">
        <Col xs={11}>
          {this.renderContactSection()}
        </Col>
        <Col xs={1}>
          {this.renderActionsSection()}
        </Col>
      </Row>*/
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
