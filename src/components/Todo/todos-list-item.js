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

    const {task, isComplete} = this.props

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
      <div className="renderTaskSection" style={taskStyle} onClick={() => this.props.toggleTask(task)}>
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
            <Button bsStyle="success">
              <span onClick={(i) => this.onSaveClick(i)} className="glyphicon glyphicon-ok"></span>
            </Button>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={< Tooltip id = "tooltip" > <strong>Cancel edit</strong> < /Tooltip>}>
            <Button bsStyle="danger">
              <span onClick={(i) => this.onCancelClick(i)} className="glyphicon glyphicon-remove"></span>
            </Button>
          </OverlayTrigger>
        </div>
      )
    }
    return (
      <div>
        <OverlayTrigger placement="top" overlay={< Tooltip id = "tooltip" > <strong>Edit</strong> < /Tooltip>}>
          <Button bsStyle="info">
            <span onClick={(i) => this.onEditClick(i)} className="glyphicon glyphicon-edit move"></span>
          </Button>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={< Tooltip id = "tooltip" > <strong>Delete</strong> < /Tooltip>}>
          <Button bsStyle="danger">
            <span onClick={(i) => this.props.deleteTask(this.props.task)} className="glyphicon glyphicon-trash deleteTask"></span>
          </Button>
        </OverlayTrigger>
      </div>
    )
  }
  render() {
    return (
      <Row>
        <Col md={11} xs={10}>
          {this.renderTaskSection()}
        </Col>
        <Col>
          {this.renderActionsSection()}
        </Col>
      </Row>
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
    const newTask = this.input.value

    this.props.saveTask(oldTask, newTask)
    this.setState({isEditing: false})

  }

}
