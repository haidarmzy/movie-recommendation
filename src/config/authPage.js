import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

export default class AuthPage extends React.Component {
  componentDidMount() {
    this.checkUserData();
  }

  // Fetch the token from storage then navigate to our appropriate place
  checkUserData = async () => {

    console.log("AUTH PAGE JALAN GA")
    const userData = await AsyncStorage.getItem('user');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userData ? 'DasboardInitial' : 'Login');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
}