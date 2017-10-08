import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import Todo from './components/Todo'
import Notes from './components/Notes'
import Welcome from './components/Welcome'
import Calendar from './components/Calendar'

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
  render() {
    return <PersonalManager />;
  }
}
