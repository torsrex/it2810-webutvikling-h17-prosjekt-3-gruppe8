import React from 'react';
import { StyleSheet, Text, View, Button, TextInput} from 'react-native';

export default class CreateNote extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      noteTitle: null,
      noteText: null,
      error: null
    }
  }


  render(){
    return (
      <View style={styles.inputForm}>
        <View style={styles.inputTexts}>
          <TextInput placeholder="note title" onChangeText={(noteTitle) => this.setState({noteTitle})}/>
          <TextInput multiline = {true} numberOfLines = {3} placeholder="note text" onChangeText={(noteText) => this.setState({noteText})}/>
        </View>
        <View style={styles.inputBtn}>
          <Button onPress={() => this.handleCreate()} title="add"/>
        </View>
      </View>
    )
  }
  //From here on, all code is to create new notes
  handleCreate() {
    const noteTitle = this.state.noteTitle
    const noteTxt = this.state.noteText
    const notEmpty = this.notEmpty(noteTitle, noteTxt) //Input validation
    if (notEmpty){
      this.props.createTask(noteTitle, noteTxt) //create the task
      this.setState({error: null})
      //Reset the input fields after successfull submit
    } else{
      this.setState({error: "Please enter a title and a note text"})
    }
  }
  notEmpty(noteTitle, noteTxt){
    if(noteTitle && noteTxt){
      return true
    }else{
      return false
    }
  }
  //Renders the error message, if any.
  renderError(){
    if(!this.state.error){
      return null
    } else{
      return <div className="centerText redText">
      {this.state.error}
      </div>
    }
  }
}

const styles = StyleSheet.create({
  inputForm: {
    display: 'flex',
    flexDirection: 'row'
  },
  inputTexts: {
    display: 'flex',
    flex: 5
  },
  inputBtn: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignSelf: 'stretch',
  }
})
