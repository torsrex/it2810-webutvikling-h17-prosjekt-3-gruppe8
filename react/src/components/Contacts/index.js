/* Main component for the contact page. Renders sub-components
and contains functions for manipulating the page data (contact list items)*/

import _ from 'lodash'
import React, {Component} from 'react'
import ContactList from './contact-list'
import CreateContact from './create-contact'
import {parseObject, updateLocalStorage} from '../../utils'
import uuid from 'uuid'

export default class Contacts extends Component {

  constructor(props) {
    super(props)
    this.state = {
      contacts: []
    }
  }

  //When the component is mounted, get tasks from localstorage (if there are any)
  componentDidMount() {
    //localStorage.clear()
    const cachedTasks = localStorage.getItem('contacts')
    this.setState({
      contacts: cachedTasks
        ? parseObject(cachedTasks)
        : []
    })
  }

  //New contact (created from create-contact component)
  createContact(name, email, number) {
    const {contacts} = this.state
    contacts.unshift({'id': uuid.v4(), name: name, email: email, number: number});
    this.setState({
      contacts
    }, () => updateLocalStorage("contacts", contacts))
  }
  //Save changes in edited contact
  saveContact(oldContactId, newName, newEmail, newNumber) {
    const {contacts} = this.state
    const foundContact = _.find(contacts, contact => contact.id === oldContactId);
    foundContact.name = newName;
    foundContact.email = newEmail;
    foundContact.number = newNumber;
    this.setState({
      contacts
    }, () => updateLocalStorage("contacts", contacts))
  }
  //Delete contact from list and view
  deleteContact(contactToDeleteId) {
    const {contacts} = this.state
    _.remove(contacts, contact => contact.id === contactToDeleteId);
    this.setState({
      contacts
    }, () => updateLocalStorage("contacts", contacts))
  }

  render() {
    return (
      <div>
        <div className="component-main-div">
          <CreateContact createContact={(name, email, number) => this.createContact(name, email, number)}/>
        </div>
        <div className="component-main-div content-main-div">
          <h2 className="center-text">Contact List</h2>
          <hr/>
          <ContactList
            contacts={this.state.contacts}
            deleteContact={(i) => this.deleteContact(i)}
            saveContact={(oldContactId, newName, newEmail, newNumber) =>
              this.saveContact(oldContactId, newName, newEmail, newNumber)}/>
        </div>
      </div>
    )
  }
}
