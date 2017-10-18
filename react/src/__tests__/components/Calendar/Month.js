import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import {shallow} from 'enzyme'
import Month from '../../../components/Calendar/Month'
import 'datejs';

//NOTE: This throws error upon testing (Object.entries) because
//Jest doesn't support babel polyfill anymore.

test('Month component has not changed visual', () => {
  const component = renderer.create(<Month openBigDay={day => null} events={{}}/>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Change date handles new year', () => {
  const component = shallow(<Month openBigDay={day => null} events={{}}/>);
  // Set state to know date in desember
  component.setState({
    date: {
      fullDate: new Date('2017-12-10T17:14:29.927'),
      year: 2017,
      month: 11,
      daysInMonth: Date.getDaysInMonth(2017, 11)
    }
  });

  // Change one month
  component.instance().changeDate(1);

  // Inspect the new calendar view
  expect(component.state('date').year).toBe(2018);
  expect(component.state('date').month).toBe(0);

});
