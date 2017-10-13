import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';


it('Checks if main component loads with all sub components', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
