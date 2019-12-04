import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, ScrollView, SafeAreaView} from 'react-native'

export default class ContentContainer extends Component{
    constructor(props){
        super(props);
    }

    static defaultProps = {

    }

    render(){
        return (
            <SafeAreaView style={styles.containerStyles}>
                <ScrollView>
                    <Text>OI</Text>
                </ScrollView>
            </SafeAreaView>
            // <View style={styles.containerStyles}></View>
        )
    }

}

const styles = StyleSheet.create({
    containerStyles: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        // flex: 1,
        backgroundColor: 'grey',
    }
})