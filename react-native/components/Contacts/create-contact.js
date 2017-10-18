import _ from 'lodash'
import React from 'react'
import {StyleSheet, View, TouchableOpacity, Keyboard, Animated, Modal} from 'react-native';
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
      tempNumber: "",
      modalVisible: false,
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
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

    this.setState({error: null, tempName: "", tempEmail: "", tempNumber: ""});
    this.props.createContact(name, email, number);
    this.setModalVisible(!this.state.modalVisible)
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

  render() {
    return (
      <View style={styles.inputForm}>
        <Modal
        style={styles.modal}
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {this.setModalVisible(!this.state.modalVisible)}}
        >
        <View style={styles.modal}>
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
          <Button full style={{backgroundColor: '#333'}} onPress={() => this.handleCreate()}>
            <Text style={styles.btnText}> SUBMIT</Text>
          </Button>
          </View>
        </Modal>
        <Button full style={styles.spanWidthBtn} onPress={() => this.setModalVisible(true)} title="Create new contact">
          <Text style={styles.btnText}> CREATE CONTACT </Text>
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    height: 300,
    marginTop: 80,
    paddingTop: 15,
    paddingBottom: 15,
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderColor: '#000',
    borderTopWidth: 2,
    borderTopWidth: 2,
  },
  spanWidthBtn: {
    display: 'flex',
    flex: 1,
    height: 50,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
