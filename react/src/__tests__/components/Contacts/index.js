import React from 'react';
import ReactDOM from 'react-dom';
import Contacts from '../../../components/Contacts'
import {shallow} from 'enzyme';

it('Checks if Contacts component loads', () => {
  const div = document.createElement('div');
  shallow(<Contacts/>)
});
