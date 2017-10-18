import React from 'react';
import ReactDOM from 'react-dom';
import ContactListItem from '../../../components/Contacts/contact-list-item'
import {shallow} from 'enzyme';

it('Checks if ContactListItem component loads', () => {
  shallow(<ContactListItem/>)
});
