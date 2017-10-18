import React from 'react';
import {Route, Link, HashRouter} from 'react-router-dom'
import './main.css';

import Welcome from './components/Welcome'
import Calendar from './components/Calendar'
import Notes from './components/Notes'
import Todo from './components/Todo'
import Contacts from './components/Contacts'

const App = () => (
  //Renders homepage with hashrouter to allow navigation
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
            <li>
              <Link to="/">Welcome</Link>
            </li>
            <li>
              <Link to="/todo">Todo</Link>
            </li>
            <li>
              <Link to="/notes">Notes</Link>
            </li>
            <li>
              <Link to="/contacts">Contacts</Link>
            </li>
            <li>
              <Link to="/calendar">Calendar</Link>
            </li>
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
