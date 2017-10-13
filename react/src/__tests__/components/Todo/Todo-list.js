import React from 'react';
import ReactDOM from 'react-dom';
import TodosList from '../../../components/Todo/todos-list'
import { shallow } from 'enzyme';

it('Checks if TodosList component loads', () => {
  const div = document.createElement('div');
  shallow(<TodosList />)
});
