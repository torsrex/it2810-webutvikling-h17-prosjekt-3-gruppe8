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
    const {id, task,isComplete} = this.props
    return (
      <View
        style={{
          paddingRight: 10,
          paddingLeft: 10,
          flexGrow: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <Text style={{
          fontSize: 25,
          textAlign: 'center',
          textDecorationLine: isComplete
            ? 'line-through'
            : 'none'
        }}
          onPress={() => this.props.toggleTask(id)}

        >{task}</Text>
        <CheckBox
          checked={isComplete}
          color={isComplete ? "green" : "red"}
          onPress={() => this.props.toggleTask(id)}
        />
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
      <Card>
        <CardItem>
          {this.renderTaskSection()}
        </CardItem>

        <CardItem style={{ flexDirection: 'row' }}>
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
