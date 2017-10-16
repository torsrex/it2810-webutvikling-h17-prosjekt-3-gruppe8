import React from 'react';
import ReactDOM from 'react-dom';
import NoteList from '../../../components/Notes/note-list'
import { shallow } from 'enzyme';

it('Checks if NoteList component loads', () => {
  const div = document.createElement('div');
  shallow(<NoteList />)
});
