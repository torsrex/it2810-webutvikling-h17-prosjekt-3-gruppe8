import React from 'react';
import {
  StyleSheet,
  View,
  TextInput
} from 'react-native';
import {Button, Label, Text, Card, CardItem, Body} from 'native-base'
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
          <TextInput placeholder={this.props.task} onChangeText={(text) => this.setState({tempTodo: text})} onSubmitEditing={(e) => this.onSaveClick(e)}/>
        </View>
      )
    }
    return (
      <View>



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
        <View>
          <Button onPress= {() => this.onSaveClick()}>
            <Text>
              Submit
            </Text>
          </Button>
          <Button onPress= {() => this.onCancelClick()}>
            <Text >
              Cancel
            </Text>
          </Button>

        </View>
      )
    }
    return (
      <View style={{flexGrow:1, flexDirection:'row',justifyContent:'space-between'}}>
        <Button info onPress={() => this.onEditClick()}>
          <Text>Edit</Text>
        </Button>
        <Button danger onPress= {(i) => this.props.deleteTask(this.props.id)}>
          <Text>Delete todo</Text>
        </Button>
      </View>
    )
  }
  render() {
    return (
      <Card style={{alignItems:'center'}}>
        <CardItem>

          {this.renderTaskSection()}
        </CardItem>
        <CardItem style={{flexDirection:'row'}}>
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

    const oldTaskId = this.props.id
    const newTask = this.state.tempTodo
    this.props.saveTask(oldTaskId, newTask)
    this.setState({isEditing: false})

  }
}
