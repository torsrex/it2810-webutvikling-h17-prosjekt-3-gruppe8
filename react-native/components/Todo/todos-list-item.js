import React from 'react';
import {View} from 'react-native';
import {
  Button,
  Text,
  Card,
  CardItem,
  Input,
  Item,
  Icon,
  CheckBox
} from 'native-base'

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
    //renders edit field
    if (this.state.isEditing) {
      return (
        <CardItem style={{
          flex: 8,
          flexDirection: 'row',
          padding: 0,
          margin: 0,
        }}>
        <Item>
          {/*Renders text with tap handling*/}
          <Input
            style={{borderWidth:1, borderColor:"black", borderRadius:3}}
            value={this.state.tempTodo}
            autoFocus
            onFocus={() => this.setState({tempTodo:this.props.task})}
            onChangeText={(text) => this.setState({tempTodo: text})}
            onSubmitEditing={() => this.onSaveClick()}/>
        </Item>
        </CardItem>
      )
    }
    const {id, task,isComplete} = this.props
    //Renders text and checkbox
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
    //Editing mode. Render save and trash buttons
    if (this.state.isEditing) {
      return (
        <CardItem style={{
          flex: 4,
          flexDirection: 'row',
        }}>
          <Button icon transparent onPress= {() => this.onSaveClick()}>
            <Icon name='ios-checkmark' />
          </Button>
          <Button icon transparent onPress= {() => this.props.deleteTask(this.props.id)}>
            <Icon name='trash' />
          </Button>

        </CardItem>
      )
    }
    //Normal mode. Render edit button
    return (
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
