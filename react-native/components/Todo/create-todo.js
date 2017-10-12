import _ from 'lodash'
import React from 'react';
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
      </View>
    )
  }

  handleCreate() {
    //TODO: Needs error handling
    const task = String.prototype.trim.call(this.state.tempTodo)
    const validateInput = this.validateInput(task)
    if (validateInput) {
      this.setState({error: validateInput})
      Toast.show({
              text: this.state.error,
              position: 'bottom',
              duration: 1500,
              type: 'warning'
            })
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
