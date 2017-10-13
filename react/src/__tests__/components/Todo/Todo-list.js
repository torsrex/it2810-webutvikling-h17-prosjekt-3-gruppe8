import React from 'react';
import ReactDOM from 'react-dom';
import TodosList from '../../../components/Todo/todos-list'
import { shallow, mount } from 'enzyme';
import uuid from 'uuid'

it('Checks if TodosList component loads', () => {
  shallow(<TodosList />)
});


it('always renders a div', () => {
  const wrapper = shallow(<TodosList />)
  const divs = wrapper.find("div")
  expect(divs.length).toBeGreaterThan(0)
})

it('Contains everything else that gets rendered in a div', () => {
  const wrapper = shallow(<TodosList />)
  const divs = wrapper.find("div")
  const wrappingDiv = divs.first()
  expect(wrappingDiv.children()).toEqual(wrapper.children())
})
