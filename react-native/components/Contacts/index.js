import React from 'react';
import _ from 'lodash'
import {View, AsyncStorage} from 'react-native';
import ContactList from './contact-list'
import CreateContact from './create-contact'
import {stringifyObject, parseObject} from '../../utils'
import uuid from 'uuid'

const contacts = [];

export default class Contacts extends React.Component {

  constructor(props) {
    super();
    this.state = {
      contacts: contacts
    }
  }
   //Fetches contacts from AsyncStorage
   componentWillMount = () => {
     AsyncStorage.getItem("contacts")
     .then(contacts => contacts && this.setState({contacts: parseObject(contacts)}))
     .catch(e => console.log(e))
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

   render() {
     return (
       <View>
        {/*CreateContact on top*/}
        <CreateContact createContact={(name, email, number) => this.createContact(name, email, number)}/>
        {/*ContactList under CreateContact*/}
        <ContactList
          contacts={this.state.contacts}
          deleteContact={(i) => this.deleteContact(i)}
          saveContact={(oldContactId, newName, newEmail, newNumber) =>
            this.saveContact(oldContactId, newName, newEmail, newNumber)}/>
       </View>
    )
  }
}
