import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native'

export default class MyAccount extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity>
              <View style={{
                  width: 100, 
                  height: 40, 
                  borderColor: 'grey',
                  borderWidth: 0.5,
                  borderRadius: 5,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                    <Text>Sign Out</Text>
                </View>
          </TouchableOpacity>
        </View>
      );
    }
  }