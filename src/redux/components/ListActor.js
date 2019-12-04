import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ListActor = (props) => {
    return (
      <TouchableOpacity>
        <View style = { styles.listActorContainer }>
            <ImageBackground source={{uri: props.imageActor}} style={styles.actorImage} imageStyle={{ borderRadius: 6 }}>
                <LinearGradient
                    colors={['rgba(0, 0, 0,0.0)', 'rgba(0, 0, 0,0.2)', 'rgba(0, 0, 0, 0.8)']}
                    style={styles.contentContainer}>
                    <View style={styles.containerActor}>
                        <Text style={styles.actorName}>{props.actorName}</Text>
                        <Text style={styles.playingAs}>{props.playingAs}</Text>
                    </View>
                </LinearGradient>
            </ImageBackground>
        </View>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    listActorContainer: {
        flex: 1,
        paddingHorizontal: 5,
    },
    actorImage: {
        height: Dimensions.get('window').width * 0.35,
        width: Dimensions.get('window').width * 0.25,
    },
    contentContainer: {
        flex : 1,
        overflow:'hidden',
        alignSelf: 'stretch',
        justifyContent: 'flex-end',
        borderRadius: 6,
    },
    containerActor:{
        height: Dimensions.get('window').height * 0.06,
        paddingBottom: 5,
        justifyContent: 'center',
        alignItems: 'flex-start'
        
    },
    actorName:{
        color: '#eee',
        fontSize: 12,
        fontWeight : '600',
        paddingLeft: 5,
        textShadowColor: 'rgba(0, 0, 0, 0.9)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 3,
    },
    playingAs: {
        color: '#eee',
        fontSize: 10,
        paddingLeft: 5,
        textShadowColor: 'rgba(0, 0, 0, 0.9)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 3,
    }
});

export default ListActor;
