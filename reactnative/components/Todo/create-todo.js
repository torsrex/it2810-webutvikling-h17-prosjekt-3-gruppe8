import _ from 'lodash'
import React from 'react';
import {StyleSheet, Text, View, Button, TextInput, TouchableOpacity} from 'react-native';
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
      <View>

        <TextInput style={styles.input} placeholder="Input text to add to todo" onChangeText={(text) => this.setState({tempTodo:text})} onSubmitEditing={(e) => this.handleCreate()}/>
        <TouchableOpacity
          style = {styles.submitButton}
           onPress = {() => this.handleCreate()}>
           <Text style = {styles.submitButtonText}> Submit </Text>
        </TouchableOpacity>
        <Text style={styles.errorStyle}>{this.state.error}</Text>
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
    this.setState({error: null})
    this.props.createTask(this.state.tempTodo)
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
      height: 40,
   },
   submitButtonText:{
     marginTop:5,
      color: 'white',
      textAlign: 'center'
   },
   errorStyle:{
     paddingTop:10,
     textAlign: 'center',
     color: 'red',
     fontSize: 20
   }
})
