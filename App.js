import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

export default class App extends React.Component {

  state = {
    loggedIn: null
  }

  logoutHandler = () => {
    firebase.auth().signOut();
  }

  renderContent = () => {

    switch(this.state.loggedIn){
      case true :
      return (
        <View style={{ height: 50, marginTop: 20 }}>
          <Button onPress={this.logoutHandler}>Log out</Button>
        </View>
      );
      case false :
      return <LoginForm />;
      default :
      return (
        <View style={{ alignSelf: 'center', alignItems: 'center', paddingBottom: 100 }}>
          <Spinner />
        </View>
      );
    }

  }

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

    firebase.auth().onAuthStateChanged( (user) => {
      if(user){
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }

    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header headerText="Authentication"/>
        {this.renderContent()}
      </View>
    );
  }
}
