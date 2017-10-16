import React from 'react';
import ReactDOM from 'react-dom';
import NoteListItem from '../../../components/Notes/note-list-item'
import { shallow } from 'enzyme';

it('Checks if NoteListItem component loads', () => {
  const div = document.createElement('div');
  shallow(<NoteListItem />)
});
