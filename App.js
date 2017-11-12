import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';

import { Header, Spinner } from './src/components/common';
import Loginform from './src/LoginForm';
import WelcomeScreen from './src/WelcomeScreen';

export default class App extends Component {
  state = { };

  componentWillMount () {
    // Initialize Firebase
    const config = {
      apiKey: 'AIzaSyAygLoqqIuTPBzi2G_pPCEiSqh02N11JAo',
      authDomain: 'auth-a6298.firebaseapp.com',
      databaseURL: 'https://auth-a6298.firebaseio.com',
      projectId: 'auth-a6298',
      storageBucket: 'auth-a6298.appspot.com',
      messagingSenderId: '59430300924'
    };
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // user has logged in
        this.setState({loggedIn: true});
      } else {
        // user has logged out
        this.setState({loggedIn: false});
      }
    }).bind(this);
  }

  renderContent () {
    switch(this.state.loggedIn) {
      case true:
        return <WelcomeScreen/>;
      case false:
        return <Loginform/>;
      default:
        return (
          <View style={styles.spinnerStyle}>
            <Spinner/>
          </View>
        );
    }
  }

  render () {
    return (
      <View>
        <Header headerText='Auth'/>
        {this.renderContent()}
      </View>
    );
  }

}

const styles = {
  spinnerStyle: {
    alignSelf: 'center'
  }
};

