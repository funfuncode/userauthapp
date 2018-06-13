import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {

  state = {
    email: '',
    password: '',
    error: '',
    authenticating: false
  }

  onLoginSuccess = () => {
    this.setState({ email: '', password: '', authenticating: false });
  }

  submitHandler = () => {
    this.setState({ error: '', authenticating: true });
    const { email, password } = this.state;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then( () => this.onLoginSuccess() )
      .catch( () => {

        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then( () => this.onLoginSuccess() )
          .catch( () => {
            this.setState({ error: 'Authentication failed', authenticating: false });
          });


    });
  }

  render(){

    return (
        <Card>
          <CardSection>
            <Input
              value={this.state.email}
              onChangeText={ (text) => this.setState( { email: text }) }
              placeholder="user@gmail.com"
              label="Email"
            />
          </CardSection>
          <CardSection>
            <Input
              secureTextEntry
              value={this.state.password}
              onChangeText={ (text) => this.setState( { password: text }) }
              label="Password"
              placeholder="password"
            />
          </CardSection>
          <Text style={styles.errorTextStyle}>{this.state.error}</Text>
          <CardSection>
            { this.state.authenticating ?
              <Spinner size="large" /> :
              <Button onPress={this.submitHandler}>Log in</Button>
            }
          </CardSection>
        </Card>

    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 18,
    alignSelf: 'center',
    color: 'red'
  }
}


export default LoginForm;
