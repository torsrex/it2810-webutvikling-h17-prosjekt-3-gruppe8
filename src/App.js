import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import './main.css';
import {NavItem, Nav, Navbar} from 'react-bootstrap';

import Welcome from './components/Welcome'
import Calendar from './components/Calendar'
import Notes from './components/Notes'
import Todo from './components/Todo'

const App = () => (
  <Router>
    <div>
      <Navbar>
        <Nav className="navbar">
          <NavItem eventKey={1}>
            <Link to="/">Home</Link>
          </NavItem>
          <NavItem eventKey={2}>
            <Link to="/todo">Todo</Link>
          </NavItem>
          <NavItem eventKey={3}>
            <Link to="/notes">Notes</Link>
          </NavItem>
          <NavItem eventKey={4}>
            <Link to="/calendar">Calendar</Link>
          </NavItem>
        </Nav>
      </Navbar>

      <hr/>

      <Route exact path="/" component={Welcome}/>
      <Route path="/todo" component={Todo}/>
      <Route path="/notes" component={Notes}/>
      <Route path="/calendar" component={Calendar}/>
    </div>
  </Router>
)
export default App
