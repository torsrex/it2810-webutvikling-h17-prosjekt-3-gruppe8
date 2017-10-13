import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from '../../../components/Calendar'
import { shallow } from 'enzyme';


it('Checks if ContactListItem component loads', () => {
  shallow(<Calendar />)
});
