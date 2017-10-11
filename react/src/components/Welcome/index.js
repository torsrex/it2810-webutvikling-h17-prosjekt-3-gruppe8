import React, {Component} from 'react'

export default class Welcome extends Component {
  render() {
    return(
      <div>
        <div className="componentMainDiv homeMainDiv">
          <h1 className="centerText whiteHeader ">Welcome to your own personal manager website</h1>
          <hr className="h1HorLine"/>
          <h4 className="centerText whiteHeader">Here you can find useful tools to help you manage things and stuff. </h4>
          <br/><br/>
        </div>

        <div className="footer">
          <h3 className="blackHeader">Magnificent footer!</h3>
          <hr className="h1HorLine"/>
          <h4 className="blackHeader">This footer has no purpose and exists only to fill space</h4>
        </div>
      </div>
    )
  }
}
