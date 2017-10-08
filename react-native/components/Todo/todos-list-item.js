import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput
} from 'react-native';
import {StackNavigator, TabNavigator} from 'react-navigation';

export default class TodosListItem extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      tempTodo: ""
    }
  }
  //Renders the task section (taskname)
  renderTaskSection() {
    if (this.state.isEditing) {
      return (
        <View>
          {/*Renders text with tap handling*/}
          <TextInput style={styles.input} placeholder={this.props.task} onChangeText={(text) => this.setState({tempTodo: text})} onSubmitEditing={(e) => this.onSaveClick(e)}/>
        </View>
      )
    }
    return (
      <View style={styles.taskBox}>
        <Text style={{
          color: this.props.isComplete
            ? 'green'
            : 'red',
          textDecorationLine: this.props.isComplete
            ? 'line-through'
            : 'none',
          fontSize: 25,
          textAlign: 'center'
        }} onPress= {() => this.props.toggleTask(this.props.id)}>{this.props.task}</Text>
      </View>
    )

  }
  renderActionsSection() {
    if (this.state.isEditing) {
      return (
        <View style={styles.actionBox}>
          <TouchableOpacity style={styles.submitButton} onPress= {() => this.onSaveClick()}>
            <Text style={styles.submitButtonText}>
              Submit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitButton} onPress= {() => this.onCancelClick()}>
            <Text style={styles.submitButtonText}>
              Cancel
            </Text>
          </TouchableOpacity>

        </View>
      )
    }
    return (
      <View>
        <Button title="Delete todo" color="red" onPress= {(i) => this.props.deleteTask(this.props.id)}/>
        <Button title="Edit" color="green" onPress={() => this.onEditClick()}/>
      </View>
    )
  }
  render() {
    return (
      <View style={styles.actionBox}>
        {this.renderTaskSection()}
        {this.renderActionsSection()}
      </View>
    )
  }

  onEditClick() {
    this.setState({isEditing: true})
  }

  onCancelClick() {
    this.setState({isEditing: false})
  }

  onSaveClick() {

    const oldTaskId = this.props.id
    const newTask = this.state.tempTodo
    this.props.saveTask(oldTaskId, newTask)
    this.setState({isEditing: false})

  }
}
//Custom styling
const styles = StyleSheet.create({
   input: {
      marginTop: 10,
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
      marginBottom: 10,
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
   },
  taskBox: {
    marginBottom: 10,
  },
  actionBox: {
    marginBottom: 15
  }
})
