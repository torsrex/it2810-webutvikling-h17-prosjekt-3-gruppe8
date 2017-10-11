import React from 'react';
import {StyleSheet, View} from 'react-native';
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
        <View style={{
          flexGrow: 1,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
        <Item>
          {/*Renders text with tap handling*/}
          <Input style={{borderWidth:1, borderColor:"black", borderRadius:3}} autoFocus value={this.state.tempTodo} onFocus={() => this.setState({tempTodo:this.props.task})} onChangeText={(text) => this.setState({tempTodo: text})} onSubmitEditing={(e) => this.onSaveClick(e)}/>
        </Item>
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
        <View style={{
          flexGrow: 1,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <Button success onPress= {() => this.onSaveClick()}>
            <Text>
              Submit
            </Text>
          </Button>
          <Button info onPress= {() => this.onCancelClick()}>
            <Text >
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
      <Card style={{
        alignItems: 'center'
      }}>
        <CardItem>

          {this.renderTaskSection()}
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
    console.log(this.state.tempTodo);
    const oldTaskId = this.props.id
    const newTask = this.state.tempTodo
    this.props.saveTask(oldTaskId, newTask)
    this.setState({isEditing: false})

  }
}
