import React from 'react';
import ReactDOM from 'react-dom';
import Todo from '../../../components/Todo'
import {shallow, mount} from 'enzyme';
import uuid from 'uuid'
import {stringifyObject, parseObject} from '../../../utils'

it('Checks if Todo component loads', () => {
  shallow(<Todo/>)
});

it('Renders todo header', () => {
  const wrapper = mount(<Todo/>)
  const welcome = <h2 className="center-text">Todo List</h2>
  expect(wrapper.contains(welcome)).toEqual(true);
})

it('always renders a div', () => {
  const wrapper = shallow(<Todo/>)
  const divs = wrapper.find("div")
  expect(divs.length).toBeGreaterThan(0)
})

it('Contains everything else that gets rendered in a div', () => {
  const wrapper = shallow(<Todo/>)
  const divs = wrapper.find("div")
  const wrappingDiv = divs.first()
  expect(wrappingDiv.children()).toEqual(wrapper.children())
})
it('Always renders a createTodo', () => {
  const wrapper = shallow(<Todo/>)
  expect(wrapper.find("CreateTodo").length).toBe(1)
})
it('Always renders a TodosList', () => {
  const wrapper = shallow(<Todo/>)
  expect(wrapper.find("TodosList").length).toBe(1)
})
