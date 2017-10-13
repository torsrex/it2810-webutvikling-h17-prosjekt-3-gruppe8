import React from 'react';
import ReactDOM from 'react-dom';
import Notes from '../../../components/Notes'
import { shallow } from 'enzyme';

it('Checks if Notes component loads', () => {
  const div = document.createElement('div');
  shallow(<Notes />)
});
