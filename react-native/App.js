import React, {Component} from 'react';
import {Root, Container, Header, Body, Title, Content, Footer, FooterTab, Button, Icon } from 'native-base'

import Todo from './components/Todo'
import Notes from './components/Notes'
import Calendar from './components/Calendar'
import Contacts from './components/Contacts'
import Expo from 'expo'

//Creates main screen navigation bar
class PersonalManager extends Component {
  constructor() {
    super()
    this.state = {
      activeTab: "Todo"
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
            Todo: <Todo/>,
            Notes: <Notes/>,
            Contacts: <Contacts/>,
            Calendar: <Calendar/>
          }[activeTab]}
        </Content>
        <Footer>
          <FooterTab>
            <Button active={activeTab === "Todo"} onPress={() => this.handleMenuClick("Todo")}>
              <Icon name="md-list"/>
            </Button>
            <Button active={activeTab === "Notes"} onPress={() => this.handleMenuClick("Notes")}>
              <Icon name="clipboard"/>
            </Button>
            <Button active={activeTab === "Contacts"} onPress={() => this.handleMenuClick("Contacts")}>
              <Icon name="md-contacts"/>
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

//Creates main app
export default class App extends Component {
  constructor() {
  super();
  this.state = {
    isReady: false
  };
}
//Sets font to native-base font
  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    })
    this.setState({ isReady: true });
  }
//Waits until font is ready to load app
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
