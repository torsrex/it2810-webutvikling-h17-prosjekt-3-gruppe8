import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import Todo from './components/Todo'
import Notes from './components/Notes'
import Welcome from './components/Welcome'
import Calendar from './components/Calendar'
import Expo from 'expo'

//Creates main screen navigation bar
const MainScreenNavigator = TabNavigator({
  Welcome: {screen: Welcome}, //Each screen shows a separate component
  Todo: {screen: Todo},
  Notes: {screen: Notes},
  Calendar: { screen: Calendar },

});

//Creates main landing page with navigator at the top
const PersonalManager = StackNavigator({
  Home: {
    screen: MainScreenNavigator, //Adds navigator to top
    navigationOptions: {
      title: 'My Personal manager', //Sets title of app
    },
  },
});

//Creates main app
export default class App extends React.Component {

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    })
  }

  render() {
    return <PersonalManager />;
  }
}
