import React from 'react';
import ReactDOM from 'react-dom';
import TodosListItem from '../../../components/Todo/todos-list-item'
import { shallow, mount } from 'enzyme';
import uuid from 'uuid'

it('Checks if TodosListItem component loads', () => {
  shallow(<TodosListItem />)
});

it('always renders a div', () => {
  const wrapper = shallow(<TodosListItem />)
  const divs = wrapper.find("div")
  expect(divs.length).toBeGreaterThan(0)
})

it('Contains everything else that gets rendered in a div', () => {
  const wrapper = shallow(<TodosListItem />)
  const divs = wrapper.find("div")
  const wrappingDiv = divs.first()
  expect(wrappingDiv.children()).toEqual(wrapper.children())
})


it('checks initial edit state', () => {
  const todos = [
    {
      id: uuid.v4(),
      task: 'First task is here',
      isComplete: true
    }
  ]
  const wrapper = mount(<TodosListItem key={todos.id} {...todos} />)
  expect(wrapper.state().isEditing).toBe(false)
})
