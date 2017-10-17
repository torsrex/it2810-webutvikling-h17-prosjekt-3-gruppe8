import React from 'react'
import ReactDOM from 'react-dom'
import sinon from 'sinon'
import CreateEvent from '../../../components/Calendar/CreateEvent'
import { shallow, mount } from 'enzyme'


const createEventArgs = {
  reset: null,
  closeCreateEvent: () => null,
  createEvent: event => null
}


test('renders three <input /> fields', () => {
  let wrapper = shallow(<CreateEvent {...createEventArgs} />);
  expect(wrapper.find('input').length).toEqual(3);
}); 

//Renders the component
test('renders six color options', () => {
  let wrapper = mount(<CreateEvent {...createEventArgs} />)
  expect(wrapper.find('option').length).toBe(6);
});

test('calls reset on click', () => {
  const onReset = sinon.spy();
  const wrapper = shallow(<CreateEvent reset={onReset} />);
  wrapper.find('button.btn-danger').simulate('click');
  expect(onReset.callCount).toBe(1);
});

test('does not try to add empty event', () => {
  const onAddEvent = sinon.spy();
  const wrapper = shallow(<CreateEvent createEvent={onAddEvent} />);
  wrapper.find('button.btn-primary').simulate('click');
  expect(onAddEvent.callCount).toBe(0);
});

test('Tries to add event', () => {
  const exampleEvent = {
    content: "Testing day",
    from: new Date().getTime(),
    to: new Date().getTime(),
    color: "red"
  }
  const onAddEvent = sinon.spy();
  const wrapper = shallow(<CreateEvent createEvent={onAddEvent} />);
  wrapper.setState({event: exampleEvent});
  wrapper.find('button.btn-primary').simulate('click');
  expect(onAddEvent.callCount).toBe(1);
});

test('Updates state with correct from date', () => {
  const wrapper = shallow(<CreateEvent />);
  wrapper.instance().handleInputChange({target: {value: '2017-10-16'}}, "from");
  expect(wrapper.state('event').from).toBe(new Date("2017-10-16").getTime());
});

