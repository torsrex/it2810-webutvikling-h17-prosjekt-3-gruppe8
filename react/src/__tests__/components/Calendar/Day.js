import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import Day from '../../../components/Calendar/Day'



test('Day component has not changed visual', () => {
  const component = renderer.create(
    <Day />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
