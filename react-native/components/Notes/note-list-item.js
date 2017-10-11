import React from 'react';
import {StyleSheet, Text, View, Button, TextInput} from 'react-native';

export default class NoteListItem extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isEditing: false,
      noteTitle: this.props.noteTitle,
      noteTxt: this.props.noteTxt
    }
  }
  //Used to update state when component receives new props, as it doesn't happen automatically
  componentWillReceiveProps(nextProps) {
  this.setState({ noteTitle: nextProps.noteTitle });
  this.setState({ noteTxt: nextProps.noteTxt });
  }

  render(){
    if(this.state.isEditing){
      return(
        <View style={styles.noteView}>
          <View style={styles.noteHeader}>
            <Button style={styles.editButton} onPress={ () => this.onSaveClick() } title="save"/>
            <TextInput style={styles.titleText} onChangeText={ (noteTitle) => this.setState({noteTitle}) } value={this.state.noteTitle}/>
            <Button style={styles.deleteButton} onPress={ () => this.onDeleteClick() } title="delete"/>
          </View>
          <TextInput style={styles.noteText} onChangeText={ (noteTxt) => this.setState({noteTxt}) } value={this.state.noteTxt}/>
        </View>
      )
    } else{
      return(
        <View style={styles.noteView}>
          <View style={styles.noteHeader}>
            <Button style={styles.editButton} onPress={ () => this.onEditClick() } title="edit"/>
            <Text style={styles.titleText}>{this.state.noteTitle}</Text>
            <Button style={styles.deleteButton} onPress={ () => this.onDeleteClick() } title="delete"/>
          </View>
          <Text style={styles.noteText}>{this.state.noteTxt}</Text>
        </View>
      )
    }
  }


  onEditClick(){
    this.setState({isEditing: true})
  }
  onSaveClick(){
    //ADD: update note list in index.js on save.
    this.props.saveNote(this.props.id, this.state)
    this.setState({isEditing: false})
  }
  onDeleteClick(){
    this.props.deleteTask(this.props.id)
  }
}

const styles = StyleSheet.create({
  noteView: {
    padding: 10,
    marginTop: 10,
    backgroundColor: '#ddd',
  },
  noteHeader: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 10,
  },
  editButton: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  titleText: {
    flex: 3,
    textAlign: 'center',
    fontSize: 20,
  },
  deleteButton: {
    flex: 1,
  },
  noteText: {
    alignSelf: 'stretch',
    textAlign: 'center',
  }
})
