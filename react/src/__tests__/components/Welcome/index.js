import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from '../../../components/Welcome'
import { shallow } from 'enzyme';

it('Checks if Welcome component loads', () => {
  const div = document.createElement('div');
  shallow(<Welcome />)
});
