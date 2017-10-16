import React from 'react';
import ReactDOM from 'react-dom';
import ContactList from '../../../components/Contacts/contact-list'
import { shallow } from 'enzyme';

it('Checks if ContactList component loads', () => {
  const div = document.createElement('div');
  shallow(<ContactList />)
});
