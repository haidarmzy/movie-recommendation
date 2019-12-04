import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ListTVNowPlaying = (props) => {
    let movieGenre = props.movieGenre;
    let movieGenreList = props.movieGenreList;

    let genreText = [];
    if(movieGenre && movieGenreList){
        for(let i=0; i<movieGenre.length; i++){
            for(let j=0; j<movieGenreList.length; j++){
                if(movieGenre[i] === movieGenreList[j].id){
                    genreText.push(movieGenreList[j].name)
                }
            }
        }
    }


    return (
      <TouchableOpacity>
        <View style = { styles.listNowPlayingContainer }>
            <ImageBackground source={{uri: props.imageUrl}} style={styles.imageMovie} imageStyle={{ borderRadius: 6 }}>

            </ImageBackground>
            <View style={styles.containerTitle}>
                <Text style={styles.titleMovie}>{props.titleMovie}</Text>
                <Text style={styles.categoryMovie}>{genreText.toString().replace(/,/g,' | ')}</Text>
                <View style={{height: 30, flexDirection: 'row',}}>
                    <View style={{justifyContent: 'center', backgroundColor: 'orange', padding: 3, borderRadius: 10, marginTop: 5}}>
                        <Text>IMDB</Text>
                    </View>
                    <Text style={{
                        justifyContent: 'center', 
                        alignSelf: 'center', 
                        fontSize: 16, 
                        marginLeft: 7, 
                        color: '#eee',
                        fontWeight: '700'
                    }}>{props.rating}</Text>
                    <Text style={{
                        justifyContent: 'center', 
                        alignSelf: 'center', 
                        fontSize: 14, 
                        marginLeft: 7, 
                        color: '#eee',
                    }}>/ 10</Text>
                </View>
            </View>
        </View>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    listNowPlayingContainer: {
        flex: 1,
        width: Dimensions.get('window').width * 0.4,
        paddingHorizontal: 5,
    },
    imageMovie: {
        height: Dimensions.get('window').width * 0.5,
        width: Dimensions.get('window').width * 0.35,
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
    },
    containerTitle: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginTop: 10,
    },
    titleMovie: {
        fontSize: 18,
        color: '#eee',
        fontWeight: '500'
    },
    categoryMovie: {
        fontSize: 10,
        color: '#ccc'
    }
});

export default ListTVNowPlaying;
