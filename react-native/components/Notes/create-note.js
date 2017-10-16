import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Modal, TouchableHighlight} from 'react-native';

export default class CreateNote extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      noteTitle: null,
      noteText: null,
      error: null,
      modalVisible: false,
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render(){
    return (
      <View style={styles.inputForm}>
        <Modal
          style={styles.modal}
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {this.setModalVisible(!this.state.modalVisible)}}
          >
          <View style={styles.modal}>
            <View style={styles.inputTexts}>
              <TextInput placeholder="note title" onChangeText={(noteTitle) => this.setState({noteTitle})}/>
              <TextInput multiline = {true} numberOfLines = {3} placeholder="note text" onChangeText={(noteText) => this.setState({noteText})}/>
            </View>

            <TouchableHighlight style={styles.spanWidthBtn} onPress={() => this.handleCreate()}>
              <Text style={styles.btnText}> ADD NEW NOTE </Text>
            </TouchableHighlight>
          </View>
        </Modal>
        <TouchableHighlight style={styles.spanWidthBtn} onPress={() => this.setModalVisible(true)} title="Create new note">
          <Text style={styles.btnText}> CREATE NOTE </Text>
        </TouchableHighlight>

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
      this.setModalVisible(!this.state.modalVisible)
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
  modal: {
    marginTop: 80,
    height: 200,
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderColor: '#000',
    borderBottomWidth: 2,
  },
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
  },
  spanWidthBtn: {
    display: 'flex',
    flex: 1,
    height: 50,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
})
