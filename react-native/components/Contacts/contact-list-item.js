import React from 'react';
import {View} from 'react-native';
import {
  Button,
  Text,
  Card,
  CardItem,
  Input,
  Item,
  Icon
} from 'native-base'

export default class ContactListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      tempName: "",
      tempEmail: "",
      tempNumber: ""
    }
  }

  onEditClick() {
    this.setState({isEditing: true})
  }
  onCancelClick() {
    this.setState({isEditing: false})
  }
  onSaveClick() {
    const oldTaskId = this.props.id;
    const newName = this.state.tempName;
    const newEmail = this.state.tempEmail;
    const newNumber = this.state.tempNumber;

    this.props.saveContact(oldTaskId, newName, newEmail, newNumber);
    this.setState({isEditing: false})
  }

  renderContactSection() {
    if (this.state.isEditing) {
      return (
        <CardItem style={{
          flex: 3,
          flexDirection: 'column'
        }}>
          <Item>
            <Input style={{
              borderWidth: 1,
              borderColor: 'black',
              borderRadius: 3
            }} autoFocus
            value={this.state.tempName}
            onFocus={() => this.setState({tempName: this.props.name})}
            onChangeText={(text) => this.setState({tempName: text})}
            onSubmitEditing={(e) => this.onSaveClick(e)}/>
          </Item>
          <Item>
            <Input style={{
              borderWidth: 1,
              borderColor: 'black',
              borderRadius: 3
            }} autoFocus
            value={this.state.tempEmail}
            onFocus={() => this.setState({tempEmail: this.props.email})}
            onChangeText={(text) => this.setState({tempEmail: text})}
            onSubmitEditing={(e) => this.onSaveClick(e)}/>
          </Item>
          <Item>
            <Input style={{
              borderWidth: 1,
              borderColor: 'black',
              borderRadius: 3
            }} autoFocus
            value={this.state.tempNumber}
            onFocus={() => this.setState({tempNumber: this.props.number})}
            onChangeText={(text) => this.setState({tempNumber: text})}
            onSubmitEditing={(e) => this.onSaveClick(e)}/>
          </Item>
        </CardItem>
      )
    }

    return (
      <CardItem style={{
        flex: 4,
        flexDirection: 'column',
        alignContent: 'flex-start',
        justifyContent: 'flex-start'
      }}>
        <Text style={{
          fontSize: 15
        }}>Name: {this.props.name}</Text>
        <Text style={{
          fontSize: 15
        }}>eMail: {this.props.email}</Text>
        <Text style={{
          fontSize: 15
        }}>tlf: {this.props.number}</Text>
      </CardItem>
    )
  }

  renderActionsSection() {
    if (this.state.isEditing) {
      return (
        <CardItem style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center'
        }}>

          <Button icon transparent onPress= {() => this.onSaveClick()}>
            <Icon name='ios-checkmark'/>
          </Button>

          <Button icon transparent onPress= {(i) => this.props.deleteContact(this.props.id)}>
            <Icon name='trash'/>
          </Button>

        </CardItem>
      )
    }

    return (
      <CardItem style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Button icon transparent onPress= {() => this.onEditClick()}>
          <Icon name='md-create'/>
        </Button>
      </CardItem>
    )
  }

  render() {
    return (
      <Card style={{
        display: 'flex',
        flexDirection: 'row',
        margin: 0,
        padding: 0
      }}>
        {this.renderContactSection()}
        {this.renderActionsSection()}
      </Card>
    )
  }
}
