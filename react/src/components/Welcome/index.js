import React, {Component} from 'react'

export default class Welcome extends Component {
  render() {
    return (
      <div>
        <div className="component-main-div home-main-div">
          <h1 className="center-text white-header ">Welcome to your own personal manager website</h1>
          <hr className="h1-horline"/>
          <h4 className="center-text white-header">Here you can find useful tools to help you manage things and stuff.
          </h4>
          <br/><br/>
        </div>

        <div className="footer">
          <h3 className="black-header">Manager created by:</h3>
          <hr className="h1-hor-line"/>
          <h4 className="black-header">Group 8 ©</h4>
        </div>
      </div>
    )
  }
}
