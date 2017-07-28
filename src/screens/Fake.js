import React, { Component } from 'react';
import { Text } from 'react-native'

class FakeScreen extends Component {
  static navigationOptions = {
    title: 'Yo dawg'
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Text>Fake Screen</Text>    
    )
  }
}

export default FakeScreen;
