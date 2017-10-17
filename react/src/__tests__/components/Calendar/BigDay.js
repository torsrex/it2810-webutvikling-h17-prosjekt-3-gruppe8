import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import BigDay from '../../../components/Calendar/BigDay'
import 'datejs';



test('Big day component has not changed visual', () => {
  let componentArgs =  {
    date: {
      month: 1,
      day: 1,
    },
    events: {

    },
    closeBigDay: () => null,
    deleteEvent: () => null
  }
  const component = renderer.create(
    <BigDay {...componentArgs} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});