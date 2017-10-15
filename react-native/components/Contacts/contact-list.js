import _ from 'lodash'
import React, {Component} from 'react'
import ContactListItem from './contact-list-item'
import {} from 'react-bootstrap'

export default class ContactList extends Component {

  renderItems() {
    const props = _.omit(this.props, 'contacts');

    return _.map(this.props.contacts, (contact, id) => <ContactListItem key={id} {...contact} {...props}/>)
  }

  render() {
    return (
      <div className="componentWrapper ">
        {this.renderItems()}
      </div>
    )
  }
}
