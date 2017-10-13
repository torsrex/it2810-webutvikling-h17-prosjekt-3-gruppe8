import React from 'react';
import ReactDOM from 'react-dom';
import Todo from '../../../components/Todo'
import { shallow, mount } from 'enzyme';

it('Checks if Todo component loads', () => {
  shallow(<Todo />)
});

it('Renders todo', () => {
  const wrapper = mount(<Todo />)
  const welcome = <h2 className="centerText">Todo List</h2>
  expect(wrapper.contains(welcome)).toEqual(true);
})
