import React from 'react';
import ReactDOM from 'react-dom';
import NoteListItem from '../../../components/Notes/note-list-item'
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer'

it('Checks if NoteListItem component loads', () => {
  shallow(<NoteListItem />)
});

test('note list item renders as before', () => {
  const component = renderer.create(
    <NoteListItem noteTitle={'Example'} noteTxt={'note text'} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
