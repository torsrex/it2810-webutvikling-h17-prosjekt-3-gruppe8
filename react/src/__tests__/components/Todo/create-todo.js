import React from 'react';
import ReactDOM from 'react-dom';
import CreateTodo from '../../../components/Todo/create-todo'
import { shallow } from 'enzyme';

it('Checks if CreateTodo component loads', () => {
  const div = document.createElement('div');
  shallow(<CreateTodo />)
});
