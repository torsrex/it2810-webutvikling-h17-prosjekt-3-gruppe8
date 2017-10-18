import React from 'react';
import ReactDOM from 'react-dom';
import CreateContact from '../../../components/Contacts/create-contact'
import {shallow} from 'enzyme';

it('Checks if CreateContact component loads', () => {
  const div = document.createElement('div');
  shallow(<CreateContact/>)
});
