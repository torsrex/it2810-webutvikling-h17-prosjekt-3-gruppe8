import React from 'react';
import {Route, Link, HashRouter} from 'react-router-dom'
import './main.css';


import Welcome from './components/Welcome'
import Calendar from './components/Calendar'
import Notes from './components/Notes'
import Todo from './components/Todo'
import Contacts from './components/Contacts'

const App = () => (
  // <Router>
  //   <div>
  //     <Navbar inverse collapseOnSelect>
  //       <Nav>
  //         <LinkContainer to="/welcome">
  //           <NavItem eventKey={2}>
  //             Home
  //           </NavItem>
  //         </LinkContainer>
  //         <LinkContainer to="/todo">
  //           <NavItem eventKey={3}>
  //             Todo
  //           </NavItem>
  //         </LinkContainer>
  //         <LinkContainer to="/notes">
  //           <NavItem eventKey={4}>
  //             Notes
  //           </NavItem>
  //         </LinkContainer>
  //         <LinkContainer to="/contacts">
  //           <NavItem eventKey={4}>
  //             Contacts
  //           </NavItem>
  //         </LinkContainer>
  //         <LinkContainer to="/calendar">
  //           <NavItem eventKey={4}>
  //             Calendar
  //           </NavItem>
  //         </LinkContainer>
  //       </Nav>
  //     </Navbar>
  //
  //     <Route exact path="/welcome" component={Welcome}/>
  //     <Route path="/todo" component={Todo}/>
  //     <Route path="/notes" component={Notes}/>
  //     <Route path="/calendar" component={Calendar}/>
  //     <Route path="/contacts" component={Contacts}/>
  //
  //   </div>
  // </Router>

  <HashRouter hashType="noslash">
    <div>
      <div id="hamburger" className="active">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="menu">
        <nav>
          <ul>
            <li><Link to="/">Welcome</Link></li>
            <li><Link to="/todo">Todo</Link></li>
            <li><Link to="/notes">Notes</Link></li>
            <li><Link to="/contacts">Contacts</Link></li>
            <li><Link to="/calendar">Calendar</Link></li>
          </ul>
        </nav>
      </div>

    <Route exact path="/" component={Welcome}/>
    <Route path="/todo" component={Todo}/>
    <Route path="/notes" component={Notes}/>
    <Route path="/calendar" component={Calendar}/>
    <Route path="/contacts" component={Contacts}/>
    </div>
  </HashRouter>
)
export default App
