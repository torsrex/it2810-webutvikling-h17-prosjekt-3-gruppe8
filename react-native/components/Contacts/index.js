import React from 'react';
import _ from 'lodash'
import { Text, View, AsyncStorage } from 'react-native';
import ContactList from './contact-list'
import CreateContact from './create-contact'
import {Container} from 'native-base'
import {stringifyObject, parseObject} from '../../utils'
import uuid from 'uuid'

const contacts = [

];

export default class Contacts extends React.Component {

  constructor(props) {
    super();
    this.state = {
      contacts: contacts
    }
  }

  componentWillMount = () => {
    AsyncStorage.getItem("contacts")
        .then(contacts => contacts && this.setState({contacts: parseObject(contacts)}))
        .catch(e => console.log(e))
  }

  render() {
    return (
      <View>
        {/*CreateContact on top*/}
        <CreateContact createContact={(i, j, k) => this.createContact(i, j, k)} />
        {/*ContactList under CreateContact*/}
        <ContactList contacts={this.state.contacts} deleteContact={(i) => this.deleteContact(i)} saveContact={(i, j, k, l) => this.saveContact(i, j, k, l)}/>
      </View>
    )
  }

  updateAsyncStore() {
    AsyncStorage.setItem('contacts', stringifyObject(this.state.contacts))
  }

  createContact(name, email, number) {
    this.state.contacts.push({'id': uuid.v4(), name: name, email: email, number: number});
    this.setState(({contacts: this.state.contacts}));
    this.updateAsyncStore()
  }

  saveContact(oldContactId, newName, newEmail, newNumber) {
    const foundContact = _.find(this.state.contacts, contact => contact.id === oldContactId);
    foundContact.name = newName;
    foundContact.email = newEmail;
    foundContact.number = newNumber;
    this.setState({contacts: this.state.contacts});
    this.updateAsyncStore()
  }

  deleteContact(contactToDeleteId) {
    _.remove(this.state.contacts, contact => contact.id === contactToDeleteId);
    this.setState({contacts: this.state.contacts});
    this.updateAsyncStore()
  }
}
