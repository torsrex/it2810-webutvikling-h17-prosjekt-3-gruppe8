import React from 'react';
import ReactDOM from 'react-dom';
import CreateNote from '../../../components/Notes/create-note'
import {shallow} from 'enzyme';

it('Checks if CreateNote component loads', () => {
  const div = document.createElement('div');
  shallow(<CreateNote/>)
});
