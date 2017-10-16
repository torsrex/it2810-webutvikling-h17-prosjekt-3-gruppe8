import React from 'react'
import ReactDOM from 'react-dom'
import Calendar from '../../../components/Calendar'
import { shallow } from 'enzyme'

const CalendarWrapper = shallow(<Calendar/>)
const testEvent = {
  '1' : {
    color: "green",
    content: "Test text",
    from: Date.now(),
    to: Date.now()
  }
}

test('Calendar component loads', () => {CalendarWrapper})

test('createEvent adds the event to this.state', () => {
  CalendarWrapper.instance().createEvent(testEvent)
  expect(CalendarWrapper.instance().state.events).toEqual(testEvent)
})

test('createEvent adds the event to localStorage', () => {
  CalendarWrapper.instance().createEvent(testEvent)
  expect(localStorage.getItem('events')).toBe(JSON.stringify(testEvent))
})
