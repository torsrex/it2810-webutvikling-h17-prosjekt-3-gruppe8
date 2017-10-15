import _ from 'lodash'
import React from 'react'
import {View, TouchableOpacity, Keyboard, Animated} from 'react-native';
import {
  Button,
  Text,
  Input,
  Container,
  Form,
  Item,
  Label,
  Toast
} from 'native-base'
import {StackNavigator, TabNavigator} from 'react-navigation';

export default class CreateContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      tempName: "",
      tempEmail: "",
      tempNumber: ""
    }
  }
  /*
  renderError() {
    if (!this.state.error) {
      return null
    }
    return <div className="centerText redText">
      {this.state.error}</div>
  }
  */
  render() {
    return (
      <View style={{
        margin: 10,
        padding: 10,
        elevation: 1.5,
        borderRadius: 5,
        backgroundColor: "white"
      }}>
        <Item floatingLabel>
          <Label>Name</Label>
          <Input value={this.state.tempName} onChangeText={(text) => this.setState({tempName: text})} onSubmitEditing={(e) => this.handleCreate()}/>
        </Item>
        <Item floatingLabel>
          <Label>Email</Label>
          <Input value={this.state.tempEmail} onChangeText={(text) => this.setState({tempEmail: text})} onSubmitEditing={(e) => this.handleCreate()}/>
        </Item>
        <Item floatingLabel>
          <Label>Number</Label>
          <Input value={this.state.tempNumber} onChangeText={(text) => this.setState({tempNumber: text})} onSubmitEditing={(e) => this.handleCreate()}/>
        </Item>
        <Button block onPress={() => this.handleCreate()}>
          <Text>Submit</Text>
        </Button>
      </View>
    )
  }

  handleCreate() {
    const name = String.prototype.trim.call(this.state.tempName);
    const email = String.prototype.trim.call(this.state.tempEmail);
    const number = String.prototype.trim.call(this.state.tempNumber);
    const validateInputName = this.validateNumber(number);
    const validateInputEmail = this.validateEmail(email);
    const validateInputNumber = this.validateName(name);
    if (validateInputName) {
      this.setState({error: validateInputName});
      Toast.show({
        text: this.state.error,
        position: 'bottom',
        duration: 1500,
        type: 'warning'
      })
      return
    } else if (validateInputEmail) {
        this.setState({error: validateInputEmail});
      Toast.show({
        text: this.state.error,
        position: 'bottom',
        duration: 1500,
        type: 'warning'
      })
        return
    } else if (validateInputNumber) {
        this.setState({error: validateInputNumber});
      Toast.show({
        text: this.state.error,
        position: 'bottom',
        duration: 1500,
        type: 'warning'
      })
        return
    }
    //TODO: Fix not save on many whitespaces
    this.setState({error: null, tempName: "", tempEmail: "", tempNumber: ""});
    this.props.createContact(name, email, number);
  }

  validateName(name) {
    if (!name) {
      return 'Please enter a name'
    } else if (/\d/.test(name)) {
        return 'Names can not contain numbers'
    } else {
      return null
    }
  }

  validateEmail(task) {
      if (!task) {
          return 'Please enter an e-mail address'
      } else if (/[^a-zA-Z0-9\-_.@]{1,}/.test(task)) {
          return 'Invalid email'
      } else {
          return null
      }
  }

  validateNumber(task) {
      if (!task) {
          return 'Please enter a phone number'
      } else if (/[^0-9+\-() ]{1,}/.test(task)) {
          return 'Invalid phone number'
      } else {
          return null
      }
  }
}
