import _ from 'lodash'
import React from 'react';
import {StyleSheet, View, TouchableOpacity, Keyboard, Animated} from 'react-native';
import {
  Button,
  Text,
  Input,
  Container,
  Form,
  Item,
  Label
} from 'native-base'
import {StackNavigator, TabNavigator} from 'react-navigation';

export default class CreateTodo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      tempTodo: ""
    }

  }
  render() {
    return (
      <View style={{
        margin: 10,
        padding: 10,
        elevation: 1.5,
        borderRadius:5
      }}>
        <Item floatingLabel>
          <Label>Input text to add to todo</Label>
          <Input value={this.state.tempTodo} onChangeText={(text) => this.setState({tempTodo: text})} onSubmitEditing={(e) => this.handleCreate()}/>
        </Item>

        <Button block onPress= {() => this.handleCreate()}>
          <Text>Submit</Text>
        </Button>
        <Animated.Text style={styles.errorStyle}>{this.state.error}</Animated.Text>
      </View>
    )
  }

  handleCreate() {
    //TODO: Needs error handling
    const task = String.prototype.trim.call(this.state.tempTodo)
    const validateInput = this.validateInput(task)
    if (validateInput) {
      this.setState({error: validateInput})
      return
    }
    this.props.createTask(this.state.tempTodo)
    this.setState({error: null, tempTodo: ""})
    Keyboard.dismiss()
  }

  validateInput(task) {
    if (!task) {
      return 'Please enter a task'
    } else if (_.find(this.props.todos, todo => todo.task === task)) {
      return 'Task already exists'
    } else {
      return null
    }
  }

}

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    height: 40,
    borderColor: '#303F9F',
    borderWidth: 1,
    textAlign: 'center'
  },
  submitButton: {
    backgroundColor: '#303F9F',
    marginLeft: 5,
    marginRight: 5,
    height: 40
  },
  submitButtonText: {
    marginTop: 5,
    color: 'white',
    textAlign: 'center'
  },
  errorStyle: {
    paddingTop: 10,
    textAlign: 'center',
    color: 'red',
    fontSize: 20
  }
})
