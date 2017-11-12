import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import {
  Button,
  Card,
  CardSection,
  Input,
  Spinner,
  FirebaseHelper
} from './components/common';

export default class Loginform extends Component {
  state = {
    email: '',
    password: '',
    errorMessage: undefined,
    loading: false
  };

  async handleLoginError ({code, message}) {
    const { USER_NOT_FOUND, WRONG_PASSWORD, INVALID_EMAIL, USER_DISABLED } = FirebaseHelper.erorrCode;
    if (code === USER_NOT_FOUND) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
        return true;
      } catch (err) {
        this.setState({errorMessage: err.message});
      }
    } else if (code === WRONG_PASSWORD) {
      this.setState({errorMessage: 'Invalid password'});
    } else if (code === INVALID_EMAIL) {
      this.setState({errorMessage: 'Invalid email'});
    } else if (code === USER_DISABLED) {
      this.setState({errorMessage: 'This user has been disabled'});
    } else {
      this.setState({errorMessage: message});
    }
    // unsuccessful
    return false;
  }

  async handleLogin () {
    this.toggleLoading();
    this.setState({errorMessage: undefined});
    const {email, password} = this.state;
    let success = false;
    try {
      success = await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (err) {
      success = await this.handleLoginError(err);
    }

    if (success) {
      this.onLoginSuccess();
    } else {
      this.toggleLoading();
    }
  }

  onLoginSuccess () {
    this.setState({
      email: '',
      password: '',
      loading: false
    });
  }

  renderLoginButton () {
    if (this.state.loading) {
      return <Spinner size={'small'}/>;
    }

    return (
      <Button onPress={() => this.handleLogin()}>
        Login
      </Button>
    );
  }

  toggleLoading () {
    this.setState({loading: !this.state.loading});
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
          {this.renderLoginButton()}
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