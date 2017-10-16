import React, {Component} from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import {Root, Container, Header, Left, Body, Right, Title, Content, Footer, FooterTab, Button, Text, Icon } from 'native-base'

import Todo from './components/Todo'
import Notes from './components/Notes'
import Welcome from './components/Welcome'
import Calendar from './components/Calendar'
import Contacts from './components/Contacts'
import Expo from 'expo'

//Creates main screen navigation bar
class PersonalManager extends Component {
  constructor() {
    super()
    this.state = {
      activeTab: "Welcome"
    }
  }

  handleMenuClick(activeTab) {
    this.setState({activeTab})
  }

  render() {
    const {activeTab} = this.state
    return (
      <Container>
        <Header style={{marginTop: 24}}>
          <Body>
            <Title>Personal Manager</Title>
          </Body>
        </Header>
        <Content>
          {{
            Welcome: <Welcome/>,
            Todo: <Todo/>,
            Notes: <Notes/>,
            Contacts: <Contacts/>,
            Calendar: <Calendar/>
          }[activeTab]}
        </Content>
        <Footer>
          <FooterTab>
            <Button active={activeTab === "Welcome"} onPress={() => this.handleMenuClick("Welcome")}>
              <Icon name="home"/>
            </Button>
            <Button active={activeTab === "Todo"} onPress={() => this.handleMenuClick("Todo")}>
              <Icon name="md-list"/>
            </Button>
            <Button active={activeTab === "Notes"} onPress={() => this.handleMenuClick("Notes")}>
              <Icon name="clipboard"/>
            </Button>
            <Button active={activeTab === "Contacts"} onPress={() => this.handleMenuClick("Contacts")}>
              <Icon name="users"/>
            </Button>
            <Button active={activeTab === "Calendar"} onPress={() => this.handleMenuClick("Calendar")}>
              <Icon name="calendar"/>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}

//Creates main landing page with navigator at the top
// const PersonalManager = StackNavigator({
//   Home: {
//     screen: MainScreenNavigator, //Adds navigator to top
//     navigationOptions: {
//       title: 'My Personal manager', //Sets title of app
//     },
//   },
// });

//Creates main app
export default class App extends Component {
  constructor() {
  super();
  this.state = {
    isReady: false
  };
}

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    })
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return (
      <Root>
        <PersonalManager />
      </Root>
    )
  }
}
