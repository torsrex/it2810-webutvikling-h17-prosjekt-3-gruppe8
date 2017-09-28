import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './index.css';

import Welcome from './components/Welcome'
import Calendar from './components/Calendar'
import Notes from './components/Notes'
import Todo from './components/Todo'


const App = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/todo">Todo</Link></li>
        <li><Link to="/notes">Notes</Link></li>
        <li><Link to="/calendar">Calendar</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Welcome}/>
      <Route path="/todo" component={Todo}/>
      <Route path="/notes" component={Notes}/>
      <Route path="/calendar" component={Calendar}/>
    </div>
  </Router>
)
export default App
