import React from 'react';
import {Text, View, Button, ScrollView} from 'react-native';
import {StackNavigator, TabNavigator} from 'react-navigation';
import ContactListItem from './contact-list-item'

export default class ContactList extends React.Component {


  render() {
    return (
      <ScrollView>
        {this.props.contacts.map((contact, index) => {
          return <ContactListItem key={contact.id} name={contact.name} id={contact.id} deleteContact={(i) => this.props.deleteContact(i)} saveContact={(i, j, k, l) => this.props.saveContact(i, j, k, l)}/>
        })}
      </ScrollView>
    )
  }
}