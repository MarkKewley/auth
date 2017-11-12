import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';

import { Header } from './src/components/common';
import Loginform from './src/LoginForm';

export default class App extends Component {

  componentWillMount() {
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
  }


  render() {
    return (
      <View>
        <Header headerText='Auth' />
        <Loginform/>
      </View>
    );
  }

}

