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
  Icon,
  Form,
  CheckBox
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

  //Renders the task section (taskname)
  renderTaskSection() {
    if (this.state.isEditing) { //renders edit field
      return (
        <CardItem style={{
          flex: 8,
          flexDirection: 'row',
          padding: 0,
          margin: 0,
        }}>
        <Item>
          {/*Renders text with tap handling*/}
          <Input style={{borderWidth:1, borderColor:"black", borderRadius:3}} value={this.state.tempTodo} autoFocus onFocus={() => this.setState({tempTodo:this.props.task})} onChangeText={(text) => this.setState({tempTodo: text})} onSubmitEditing={(e) => this.onSaveClick(e)}/>
        </Item>
        </CardItem>
      )
    }
    const {id, task,isComplete} = this.props //Renders text and checkbox
    return (
      <CardItem
        style={{
          flex: 9,
          flexDirection: "row",
        }}
      >
        <CheckBox
          checked={isComplete}
          color={isComplete ? "green" : "red"}
          onPress={() => this.props.toggleTask(id)}
        />
        <Text style={{
          paddingLeft: 15,
          fontSize: 15,
          textAlign: 'left',
          textDecorationLine: isComplete
            ? 'line-through'
            : 'none'
        }}
          onPress={() => this.props.toggleTask(id)}
        >{task}</Text>
      </CardItem>
    )

  }
  //Render buttons for saving, deleting, and editing
  renderActionsSection() {
    if (this.state.isEditing) { //Editing mode. Render save and trash buttons
      return (
        <CardItem style={{
          flex: 4,
          flexDirection: 'row',
        }}>
          <Button icon transparent onPress= {() => this.onSaveClick()}>
            <Icon name='ios-checkmark' />
          </Button>
          <Button icon transparent onPress= {(i) => this.props.deleteTask(this.props.id)}>
            <Icon name='trash' />
          </Button>

        </CardItem>
      )
    }
    return ( //Normal mode. Render edit button
      <CardItem style={{
        flex: 2,
        flexDirection: 'row',
      }}>
      <Button icon transparent onPress= {() => this.onEditClick()}>
        <Icon name='md-create' />
      </Button>
      </CardItem>
    )
  }
  render() {
    return (
      <Card style={{
        display: 'flex',
        flexDirection: 'row',
      }}>
        {this.renderTaskSection()}
        {this.renderActionsSection()}
      </Card>
    )
  }
}
