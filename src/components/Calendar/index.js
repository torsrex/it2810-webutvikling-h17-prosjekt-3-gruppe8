import React, { Component } from 'react'
import Month from './Month'
import CreateEvent from './CreateEvent'
// import DayBig from './DayBig'
// import RoomLegend from './RoomLegend'
//
// const RoomLegends = ({i}) => {
//   return(
//     <div className="room-legend">
//       <ul>
//         {Array(i).fill().map((x,i) => <RoomLegend key={i} id={i+1}/>)}
//       </ul>
//       <h5>Színjelölés(szobaszám)</h5>
//     </div>
//   )
// }

const parseObject = o => JSON.parse(o)

const initialState = {
  isDayBig: false,
  date: {},
  dayCalendarEvents: {}
}

export default class Calendar extends Component {
  constructor(){
    super()
    this.state = initialState
  }

  handleDayClick(dayData){
    const {date, dayEvents} = dayData
    const dayCalendarEvents = Object.assign({}, this.props.dayCalendarEvents)
    Object.keys(dayCalendarEvents).forEach( key => {
      !dayEvents.includes(key) && delete dayCalendarEvents[key]
    })
    this.setState({
      isDayBig: true,
      date,
      dayCalendarEvents
    })
  }

  closeBigDay(){
    this.setState(initialState)
  }

  render() {
    console.log(localStorage.getItem("events"));

    const {isDayBig, date} = this.state
    return (
      <div id="calendar-wrapper">
        <CreateEvent>
        </CreateEvent>
        <Month
          handleDayClick={day => this.handleDayClick(day)}
          calendarEvents={parseObject(localStorage.getItem('events'))}
        />

        {/* {isDayBig &&
          <DayBig
            closeBigDay={() => this.closeBigDay()}
            date={date}
            calendarEvents={this.state.dayCalendarEvents}
          />
        } */}

        {/* <RoomLegends i={6}/> */}
      </div>
    )
  }
}
