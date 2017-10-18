import React from 'react';
import ReactDOM from 'react-dom';
import NoteList from '../../../components/Notes/note-list'
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer'

it('Checks if NoteList component loads', () => {
  const div = document.createElement('div');
  shallow(<NoteList/>)
});

it('Renders as before', () => {

  const component = renderer.create(<NoteList/>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});