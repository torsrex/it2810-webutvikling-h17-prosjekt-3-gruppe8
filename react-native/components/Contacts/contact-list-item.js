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
        <View style={{
          flexGrow: 1,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <Button success onPress={() => this.onSaveClick()}>
            <Text>
              Submit
            </Text>
          </Button>
          <Button info onPress={() => this.onCancelClick()}>
            <Text>
              Cancel
            </Text>
          </Button>
        </View>
      )
    }
    return (
      <View style={{
        flexGrow: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}>
        <Button info onPress={() => this.onEditClick()}>
          <Text>
            Edit
          </Text>
        </Button>
        <Button danger onPress={(i) => this.props.deleteContact(this.props.id)}>
          <Text>
            Delete
          </Text>
        </Button>
      </View>
    )
  }
  render() {
    return (
      <Card>
        <CardItem>
          {this.renderContactSection()}
        </CardItem>
        <CardItem style={{
          flexDirection: 'row'
        }}>
          {this.renderActionsSection()}
        </CardItem>
      </Card>
    )
  }
  onEditClick() {
    this.setState({isEditing: true})
  }
  onCancelClick() {
    this.setState({isEditing: false})
  }
  onSaveClick() {
    const oldTaskId = this.props.id;
    const newName = this.state.tempName;
    const newEmail = this.state.tempEmail;
    const newNumber = this.state.tempNumber;

    this.props.saveContact(oldTaskId, newName, newEmail, newNumber);
    this.setState({isEditing: false})

  }

}
