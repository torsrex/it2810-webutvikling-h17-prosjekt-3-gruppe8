import React, {Component} from 'react'
import {
  Row,
  Col,
  FormGroup,
  FormControl,
  Well,
  OverlayTrigger,
  Tooltip,
  Button
} from 'react-bootstrap'

export default class TodosListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false
    }
  }

  renderTaskSection() {

    const {id, task, isComplete} = this.props

    const taskStyle = {
      color: isComplete
        ? 'green'
        : 'red',
      textDecorationLine: isComplete
        ? 'line-through'
        : '',
      cursor: 'pointer'
    }

    if (this.state.isEditing) {

      return (
        <div>
          <form onSubmit={(i) => this.onSaveClick(i)}>
            <FormGroup>
              <FormControl type="text" defaultValue={task} inputRef={(ref) => {
                this.input = ref
              }}/>

            </FormGroup>
          </form>
        </div>
      )
    }

    return (
      <div className="renderTaskSection" style={taskStyle} onClick={() => this.props.toggleTask(id)}>
        <Well bsSize="sm">
          {task}
        </Well>
      </div>
    )
  }

  renderActionsSection() {
    if (this.state.isEditing) {
      return (
        <div>
          <OverlayTrigger placement="top" overlay={< Tooltip id = "tooltip" > <strong>Save todo</strong> < /Tooltip>}>
            <Button className="glyphicon glyphicon-ok move" onClick={(i) => this.onSaveClick(i)}/>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={< Tooltip id = "tooltip" > <strong>Cancel edit</strong> < /Tooltip>}>
            <Button className="glyphicon glyphicon-trash deleteTask" onClick={(i) => this.onCancelClick(i)}/>
          </OverlayTrigger>
        </div>
      )
    }
    return (
      <div>
        <OverlayTrigger placement="top" overlay={< Tooltip id = "tooltip" > <strong>Edit</strong> < /Tooltip>}>
          <Button className="glyphicon glyphicon-edit move editClick" onClick={(i) => this.onEditClick(i)}/>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={< Tooltip id = "tooltip" > <strong>Delete</strong> < /Tooltip>}>
          <Button className="glyphicon glyphicon-trash deleteTask" onClick={(i) => this.props.deleteTask(this.props.id)}/>
        </OverlayTrigger>
      </div>
    )
  }
  render() {
    return (
      <div>

      <Row className="fillWidth">
        <Col md={10} xs={10}>
          {this.renderTaskSection()}
        </Col>
        <Col>
          {this.renderActionsSection()}
        </Col>
      </Row>
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

    const oldTaskId = this.props.id
    const newTask = this.input.value

    this.props.saveTask(oldTaskId, newTask)
    this.setState({isEditing: false})

  }

}
