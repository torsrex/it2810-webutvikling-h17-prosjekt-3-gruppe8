import React from 'react';
import ReactDOM from 'react-dom';
import TodosListItem from '../../../components/Todo/todos-list-item'
import { shallow, mount } from 'enzyme';

it('Checks if TodosListItem component loads', () => {
  shallow(<TodosListItem />)
});
