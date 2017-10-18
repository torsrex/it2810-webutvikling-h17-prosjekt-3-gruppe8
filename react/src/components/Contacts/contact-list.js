/*
Renders the list of all contacts,
and creates every single individual contact based on the list in index.js.
*/

import _ from 'lodash'
import React, {Component} from 'react'
import ContactListItem from './contact-list-item'
import {} from 'react-bootstrap'

export default class ContactList extends Component {

  renderItems() {
    const props = _.omit(this.props, 'contacts');
    //Generate list of all contacts (contact-list-items)
    return _.map(this.props.contacts, (contact, id) =>
      <ContactListItem key={id} {...contact} {...props}/>)
  }

  render() {
    return (
      <div className="component-wrapper ">
        {this.renderItems()}
      </div>
    )
  }
}
