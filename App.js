import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import { Header } from './components/common';
import LoginForm from './components/LoginForm';

export default class App extends React.Component {

  componentWillMount(){
    const config = {
      apiKey: "AIzaSyCzSb43jAK1nTI6zaX-dmZSqKLJLTjckJ4",
      authDomain: "appauth-2fcca.firebaseapp.com",
      databaseURL: "https://appauth-2fcca.firebaseio.com",
      projectId: "appauth-2fcca",
      storageBucket: "appauth-2fcca.appspot.com",
      messagingSenderId: "879890821213"
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication"/>
        <LoginForm />
      </View>
    );
  }
}
