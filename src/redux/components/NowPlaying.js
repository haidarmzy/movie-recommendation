import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import configureStore from '../../../store'
import { addConvertedGenre } from '../actions/effects';

const store = configureStore();

const NowPlayingList = (props) => {
    let movieId = props.movieId
    let genreList = props.genreList
    let movieGenre = props.movieGenre
    // console.log("MOVIE GENRE ", movieGenre )
    let genreText = [];
    if(movieGenre.length !== 0 && genreList){
        for(let i=0; i<movieGenre.length; i++){
            for(let j=0; j<genreList.length; j++){
                if(movieGenre[i] === genreList[j].id){
                    genreText.push(genreList[j].name)
                }
            }
        }
        // store.dispatch(addConvertedGenre(genreText, movieId))
    }

    return (
        <TouchableOpacity onPress={props.goToDetails}>
            <View style={styles.listContainer}>
                <ImageBackground source={{uri: props.urlPoster}} style={styles.posterStyle}></ImageBackground>
                <View style={styles.containerDetailMovie}>
                    <View style={styles.detailsMovie}>
                        <View style={{flex: 0.4,justifyContent: 'center'}}>
                            <Text style={styles.movieTitleText}>{ props.titleMovie }</Text>
                            <Text style={styles.movieGenreText}>{ genreText.toString().replace(/,/g,' | ') }</Text>
                        </View>
                        <View style={styles.ratingContainer}>
                            <Text>{props.movieRating} / 10</Text>
                            <View style={styles.imdbContainer}>
                                <Text style={styles.imdbText}>IMDB</Text>
                            </View>
                        </View>
                        <View style={styles.synopsysStyle}>
                            <Text numberOfLines={4} style={{fontSize: 12}}>{props.synopsys}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        borderRadius: 15,
        height: 180,
        width: '100%',
        backgroundColor: '#eee',
        marginTop: 30,
        shadowOffset:{
            width: 0,
            height: 3
        },
        shadowOpacity: 0.1
    },
    posterStyle:{
        flex: 0.35,
        height: 200,
        width: 140,
        borderRadius: 5,
    },
    containerDetailMovie:{
        flex: 0.65,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        marginLeft: 10
    },
    detailsMovie:{
        flex: 1,
        height:'100%', 
        width:'100%', 
        padding: 7,
        alignItems:'flex-start'
    },
    movieTitleText:{
        fontSize: 20,
        fontWeight: '500'
    },
    movieGenreText:{
        paddingTop:2,
        fontSize: 10,
        color: '#a1a1a1'
    },
    ratingContainer:{
        flex: 0.1,
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imdbContainer:{
        backgroundColor: '#ffb400',
        borderRadius: 8,
        marginLeft: 7,
        padding: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imdbText:{
        fontSize: 8,
    },
    synopsysStyle:{
        flex: 0.5, justifyContent:'flex-end'
    }
//   listItem: {
//     width: '100%',
//     padding: 10,
//     marginBottom: 10,
//     backgroundColor: '#eee'
//   }
});

export default NowPlayingList