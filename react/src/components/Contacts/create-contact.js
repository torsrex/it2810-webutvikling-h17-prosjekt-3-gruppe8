/*
Component that renders the form for creating new contacts.
Handles creation/validation of new individual contacts.
*/

import React, {Component} from 'react'
import {FormGroup, FormControl, Button} from 'react-bootstrap'

export default class CreateContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    }
  }
  renderError() {
    if (!this.state.error) {
      return null
    }
    return <div className="center-text red-text">
      {this.state.error}</div>
  }

  //Create new contact w/ validation.
  handleCreate(event) {
    event.preventDefault();

    const createInputName = this.inputName;
    const createInputEmail = this.inputEmail;
    const createInputNumber = this.inputNumber;
    const name = String.prototype.trim.call(createInputName.value);
    const email = String.prototype.trim.call(createInputEmail.value);
    const number = String.prototype.trim.call(createInputNumber.value);
    const validateInputName = this.validateNumber(number);
    const validateInputEmail = this.validateEmail(email);
    const validateInputNumber = this.validateName(name);
    if (validateInputName) {
      this.setState({error: validateInputName});
      return
    } else if (validateInputEmail) {
        this.setState({error: validateInputEmail});
        return
    } else if (validateInputNumber) {
        this.setState({error: validateInputNumber});
        return
    }
    //TODO: Fix not save on many whitespaces
    this.setState({error: null});
    this.props.createContact(name, email, number);
    this.inputName.value = '';
    this.inputEmail.value = '';
    this.inputNumber.value = '';
  }

  //Validation
  validateName(name) {
    if (!name) {
      return 'Please enter a name'
    } else if (/\d/.test(name)) {
        return 'Names can not contain numbers'
    } else {
      return null
    }
  }

  validateEmail(task) {
    if (!task) {
        return 'Please enter an e-mail address'
    } else if (/[^a-zA-Z0-9\-_.@]{1,}/.test(task)) {
        return 'Invalid email'
    } else {
        return null
    }
  }

  validateNumber(task) {
    if (!task) {
        return 'Please enter a phone number'
    } else if (/[^0-9+\-() ]{1,}/.test(task)) {
        return 'Invalid phone number'
    } else {
        return null
    }
  }


  render() {
    return (
      <div className="component-wrapper flex-column">
        <h4 className="center-text white-header">Create a contact</h4>
        <form className="static-form" onSubmit={(i) => this.handleCreate(i)}>
          <FormGroup>
            <FormControl type="text" placeholder="Name" inputRef={(ref) => {
              this.inputName = ref
            }}/>
            <FormControl type="text" placeholder="E-mail" inputRef={(ref) => {
                this.inputEmail = ref
            }}/>
            <FormControl type="text" placeholder="Phone number" inputRef={(ref) => {
                this.inputNumber = ref
            }}/>
            <Button block type="submit">add</Button>
            {this.renderError()}
          </FormGroup>
        </form>
      </div>
    )
  }
}
