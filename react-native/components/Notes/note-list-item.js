import React from 'react';
import {StyleSheet, Text, View, TextInput, Image, TouchableHighlight} from 'react-native';

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

  render(){
    if(this.state.isEditing){
      return(
        <View style={styles.noteView}>
          <View style={styles.noteContent}>
            <View style={styles.noteHeader}>
              <TextInput
                style={styles.titleText}
                onChangeText={ (noteTitle) => this.setState({noteTitle}) }
                value={this.state.noteTitle}/>
            </View>
            <TextInput
              multiline numberOfLines = {3}
              style={styles.noteText}
              onChangeText={ (noteTxt) => this.setState({noteTxt}) }
              value={this.state.noteTxt}/>
          </View>

          <TouchableHighlight style={styles.alignVertical} onPress={ () => this.onSaveClick() }>
            <Image style={styles.imgBtn} source={require('../.././images/check.png')}/>
          </TouchableHighlight>

          <TouchableHighlight style={styles.alignVertical} onPress={ () => this.onDeleteClick() }>
            <Image style={styles.imgBtn} source={require('../.././images/trash.png')}/>
          </TouchableHighlight>

        </View>
      )
    } else{
      return(
        <View style={styles.noteView}>

          <View style={styles.noteContent}>
            <View style={styles.noteHeader}>
              <Text style={styles.titleText}>{this.state.noteTitle}</Text>
            </View>
            <Text style={styles.noteText}>{this.state.noteTxt}</Text>
          </View>

          <TouchableHighlight style={styles.alignVertical} onPress={ () => this.onEditClick() }>
            <Image style={styles.imgBtn} source={require('../.././images/edit.png')}/>
          </TouchableHighlight>

        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  noteView: {
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    borderColor: '#d6d7da',
    borderBottomWidth: 1,
  },
  noteContent: {
    flex: 6,
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  noteHeader: {
    display: 'flex',
    flexDirection: 'row',
  },
  titleText: {
    flex: 3,
    textAlign: 'center',
    fontSize: 20,
  },
  imgBtn: {
    width: 30,
    height: 30,
  },
  noteText: {
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  alignVertical: {
    flexDirection: 'column',
    flex: 1,
    alignItems:'center',
    justifyContent: 'center',
  },
})
