import React from 'react';
import ReactDOM from 'react-dom';
import CreateTodo from '../../../components/Todo/create-todo'
import {shallow, mount} from 'enzyme';

it('Checks if CreateTodo component loads', () => {
  shallow(<CreateTodo/>)
});

it('Renders create todo header', () => {
  const wrapper = mount(<CreateTodo/>)
  const createTodoHeader = <h4 className="center-text white-header">Create a todo task</h4>
  expect(wrapper.contains(createTodoHeader)).toEqual(true);
})

it('always renders a div', () => {
  const wrapper = shallow(<CreateTodo/>)
  const divs = wrapper.find("div")
  expect(divs.length).toBeGreaterThan(0)
})

it('Contains everything else that gets rendered in a div', () => {
  const wrapper = shallow(<CreateTodo/>)
  const divs = wrapper.find("div")
  const wrappingDiv = divs.first()
  expect(wrappingDiv.children()).toEqual(wrapper.children())
})
