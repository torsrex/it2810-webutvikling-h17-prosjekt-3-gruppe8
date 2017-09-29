import React, {Component} from 'react'
import {Grid, Row, Col} from 'react-bootstrap'

export default class TodosListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false
    }
  }

  renderTaskSection() {

    const {task, isComplete} = this.props

    const taskStyle = {
      color: isComplete
        ? 'green'
        : 'red',
      textDecorationLine: isComplete
      ? 'line-through' :
      '',
      cursor: 'pointer'
    }

    if (this.state.isEditing) {

      return (
        <div>
          <form onSubmit={this.onSaveClick.bind(this)}>
            <input type="text" defaultValue={task} ref="editInput"/>
          </form>
        </div>
      )
    }

    return (
      <div style={taskStyle} onClick={this.props.toggleTask.bind(this, task)}>
        {task}
      </div>
    )
  }

  renderActionsSection() {
    if (this.state.isEditing) {
      return (
        <div>
          <span onClick={this.onSaveClick.bind(this)} className="glyphicon glyphicon-ok"></span>
          <span onClick={this.onCancelClick.bind(this)} className="glyphicon glyphicon-remove"></span>
        </div>
      )
    }
    return (
      <div>
        <span onClick={this.onEditClick.bind(this)} className="glyphicon glyphicon-edit"></span>
        <span onClick={this.props.deleteTask.bind(this, this.props.task)}  className="glyphicon glyphicon-trash"></span>
      </div>
    )
  }
  render() {
    return (
    <div>
      <Grid fluid>
        <Row>
          <Col md={10} xs={9}>
          {this.renderTaskSection()}
        </Col>
        <Col>
          {this.renderActionsSection()}
        </Col>
        </Row>
        </Grid>
    </div>
    )
  }
  onEditClick() {
    this.setState({isEditing: true})
  }
  onCancelClick() {
    this.setState({isEditing: false})
  }
  onSaveClick(event) {
    event.preventDefault()

    const oldTask = this.props.task
    const newTask = this.refs.editInput.value

    this.props.saveTask(oldTask, newTask)
    this.setState({isEditing: false})

  }

}
