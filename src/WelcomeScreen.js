import React, {Component} from 'react';
import firebase from 'firebase';
import { Card, CardSection, Button } from './components/common';

export default class WelcomeScreen extends Component {
  async onLogoutButtonPress () {
    console.log('SIGNED OUT???');
    await firebase.auth().signOut();
    console.log('SIGNED OUT???');
  }

  render () {
    return (
      <Card>
        <CardSection>
          <Button onPress={() => this.onLogoutButtonPress()}>
            Log out
          </Button>
        </CardSection>
      </Card>
    );
  }
}