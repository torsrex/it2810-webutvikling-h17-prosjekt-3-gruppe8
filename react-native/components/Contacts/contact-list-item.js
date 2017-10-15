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
/*
    const {name, email, number} = this.props;

    const contactStyle = {

    };
*/
    if (this.state.isEditing) {

      return (

        <View style={{
          flexGrow: 1,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <Item>
            <Input style={{borderWidth:1, borderColor:'black', borderRadius:3}} autoFocus value={this.state.tempName} onFocus={() => this.setState({tempName: this.props.name})} onChangeText={(text) => this.setState({tempName: text})} onSubmitEditing={(e) => this.onSaveClick(e)}/>
          </Item>
          <Item>
            <Input style={{borderWidth:1, borderColor:'black', borderRadius:3}} autoFocus value={this.state.tempEmail} onFocus={() => this.setState({tempEmail: this.props.email})} onChangeText={(text) => this.setState({tempEmail: text})} onSubmitEditing={(e) => this.onSaveClick(e)}/>
          </Item>
          <Item>
            <Input style={{borderWidth:1, borderColor:'black', borderRadius:3}} autoFocus value={this.state.tempNumber} onFocus={() => this.setState({tempNumber: this.props.number})} onChangeText={(text) => this.setState({tempNumber: text})} onSubmitEditing={(e) => this.onSaveClick(e)}/>
          </Item>
        </View>
      )
    }

    return (
      <View>
        <Text style={{
          fontSize: 25,
          textAlign: 'center'
        }}>{this.props.name}</Text>
        <Text style={{
          fontSize: 25,
          textAlign: 'center'
        }}>{this.props.email}</Text>
        <Text style={{
          fontSize: 25,
          textAlign: 'center'
        }}>{this.props.number}</Text>
      </View>
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
