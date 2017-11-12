import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Card, CardSection, Button, Input } from './components/common';

export default class Loginform extends Component {
  state = {email: '', password: '', errorMessage: undefined};

  async handleLoginError({code, message}) {
    if (code === 'auth/user-not-found') {
      try {
        await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
        this.setState({errorMessage: undefined});
      } catch (err) {
        this.setState({errorMessage: err.message});
      }
    } else if (code === 'auth/wrong-password') {
      this.setState({errorMessage: 'Invalid password'});
    } else if (code === 'auth/invalid-email') {
      this.setState({errorMessage: 'Invalid email'});
    } else if (code === 'auth/user-disabled') {
      this.setState({errorMessage: 'This user has been disabled'});
    } else {
      console.log('UNKNOWN ERROR');
      this.setState({errorMessage: message});
    }
  }

  async handleLogin () {
    const {email, password} = this.state;
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      this.setState({errorMessage: undefined});
    } catch (err) {
      await this.handleLoginError(err);
    }
  }

  render () {
    return (
      <Card>
        <CardSection>
          <Input
            label={'Email'}
            placeholder={'example@gmail.com'}
            value={this.state.email}
            onChangeText={email => this.setState({email})}
          />
        </CardSection>

        <CardSection>
          <Input
            label={'Password'}
            secureTextEntry
            placeholder={'12345'}
            value={this.state.password}
            onChangeText={password => this.setState({password})}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.state.errorMessage}
        </Text>

        <CardSection>
          <Button onPress={() => this.handleLogin()}>
            Login
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};