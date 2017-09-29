import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import './main.css';
import {NavItem, Nav, Navbar, Jumbotron, Grid} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'
import 'bootstrap/less/bootstrap.less'

import Welcome from './components/Welcome'
import Calendar from './components/Calendar'
import Notes from './components/Notes'
import Todo from './components/Todo'



const App = () => (
  <Router>
    <div>

      <Navbar inverse collapseOnSelect>
        <Nav right eventKey={1}>
        <LinkContainer to="/">
        <NavItem eventKey={2}>
          Home
        </NavItem>
      </LinkContainer>
        <LinkContainer to="/todo">
          <NavItem eventKey={3}>
            Todo
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/notes">
          <NavItem eventKey={4}>
          Notes
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/calendar">
          <NavItem eventKey={4}>
            Calendar
          </NavItem>
        </LinkContainer>
        </Nav>
      </Navbar>

      <Route exact path="/" component={Welcome}/>
      <Route path="/todo" component={Todo}/>
      <Route path="/notes" component={Notes}/>
      <Route path="/calendar" component={Calendar}/>

    <Grid>
      <footer>
        Best personal manager
      </footer>
  </Grid>
    </div>
  </Router>
)
export default App
