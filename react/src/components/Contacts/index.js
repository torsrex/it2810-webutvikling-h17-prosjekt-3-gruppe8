import _ from 'lodash'
import React, {Component} from 'react'
import ContactList from './contact-list'
import CreateContact from './create-contact'
import {stringifyObject, parseObject} from '../../utils'
import uuid from 'uuid'

const contacts = [
  {
    id: uuid.v4(),
    name: 'Markus',
    email: 'example@mail.com',
    number: '12345678',
  }, {
    id: uuid.v4(),
    name: 'Martin',
    email: 'example@mail.com',
    number: '12345678',
  }
];

export default class Contacts extends Component {

  constructor(props) {
    super(props);
    const cachedContacts = localStorage.getItem('contacts');
    if (cachedContacts) {
      this.state = {
        contacts: parseObject(cachedContacts)
      }
    } else {
      this.state = {
        contacts: contacts

      }
    }

  }

  render() {
    return (
      <div>
        <div className="componentMainDiv">
          <CreateContact contacts={this.state.contacts} createContact={(i, j, k) => this.createContact(i, j, k)}/>
        </div>
        <div className="componentMainDiv contentMainDiv">
          <h2 className="centerText">Contact List</h2>
          <hr/>
          <ContactList contacts={this.state.contacts} saveContact={(i, j, k, l) => this.saveContact(i, j, k, l)} deleteContact={(i) => this.deleteContact(i)}/>
        </div>
      </div>
    )
  }
  updateLocalStore() {
    localStorage.setItem('contacts', stringifyObject(this.state.contacts))

  }


  createContact(name, email, number) {
    this.state.contacts.push({'id': uuid.v4(), name: name, email: email, number: number});
    this.setState(({contacts: this.state.contacts}));
    this.updateLocalStore()
  }

  saveContact(oldContactId, newName, newEmail, newNumber) {
    const foundContact = _.find(this.state.contacts, contact => contact.id === oldContactId);
    foundContact.name = newName;
    foundContact.email = newEmail;
    foundContact.number = newNumber;
    this.setState({contacts: this.state.contacts});
    this.updateLocalStore()
  }

  deleteContact(contactToDeleteId) {
    _.remove(this.state.contacts, contact => contact.id === contactToDeleteId);
    this.setState({contacts: this.state.contacts});
    this.updateLocalStore()

  }

}
