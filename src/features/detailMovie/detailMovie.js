import React from 'react';
import { View, SafeAreaView, ScrollView, Text, StyleSheet, TextInput, Button, FlatList, Image, Dimensions, ImageBackground, Platform, StatusBar, ActivityIndicator} from 'react-native'
import { connect } from 'react-redux';
import * as Fetch from '../../api/fetchapi'
import * as Constant from '../../api/constant'
import { addMovieDetails } from '../../redux/actions/effects';
import ListActor from '../../redux/components/ListActor'
import ListReview from '../../redux/components/ListReview'
import LinearGradient from 'react-native-linear-gradient';
import StarRating from 'react-native-star-rating';
import configureStore from '../../../store'
import CardView from 'react-native-rn-cardview'

class DetailMovie extends React.Component {

    state = {
        movieDetailsData: [],
        idMovie: undefined,
        isBusy: false,
        genreList: [],
        genreCategory: '',
        releaseDate: '',
        director: {},
        writerData: [],
        writerName: [],
        crewList: [],
        castList: [],
        movieReview: []
    }

    componentDidMount(){
        
    }

    componentWillUnmount(){
        console.log("ComponentWillUnmount")
    }

    componentWillMount(){
        console.log("DAPET STATE YES ", this.props.genreList)
        this.convertGenre(this.props.navigation.getParam('movieGenre'), this.props.genreList)
        this.setState({
            isBusy: true,
            idMovie : this.props.navigation.getParam('id')
        })
        Fetch.request('GET', '/movie/' + this.props.navigation.getParam('id'), '&language=en-US&append_to_response=credits,reviews')
        .then((response)=>{
            console.log("DAPET ALL RESPONSE 1: ", response)
            this.props.getMovieDetail(response, this.props.navigation.getParam('id'))
            this.setState({
                isBusy: false,
                movieReview: response.reviews.results
            })
            this.formatDate(this.props.movieDetailsData[this.state.idMovie].release_date)
            this.getPeople(this.props.movieDetailsData[this.state.idMovie].credits);
        })
        // Promise.all([
        //     Fetch.request('GET', '/movie/' + this.props.navigation.getParam('id'), '&language=en-US&append_to_response=credits,reviews'),
        //     Fetch.request('GET', '/movie/'+ this.props.navigation.getParam('id') +'/reviews', '&language=en-US&page=1')
        // ])
        // .then((allResponse)=>{
        //     console.log("DAPET ALL RESPONSE 1: ", allResponse)
        //     this.props.getMovieDetail(allResponse[0], this.props.navigation.getParam('id'))
        //     this.setState({
        //         isBusy: false
        //     })
        //     this.formatDate(this.props.movieDetailsData[this.state.idMovie].release_date)
        //     this.getPeople(this.props.movieDetailsData[this.state.idMovie].credits);
        // })
        
        console.log("ComponentWillMount ", this.props.movieDetailsData)
    }

    convertGenre(movieGenre, listGenre){
        console.log("DAPET GENRE GAK ", movieGenre)

        let genreText = [];
        if(movieGenre.length !== 0){
            for(let i=0; i<movieGenre.length; i++){
                for(let j=0; j<listGenre.length; j++){
                    if(movieGenre[i] === listGenre[j].id){
                        genreText.push(listGenre[j].name)
                    }
                }
            }
        }

        this.setState({
            genreCategory: genreText.toString().replace(/,/g,' | ')
        })

    }

    getPeople(credits){
        let director;
        let writer = [];
        let writerName = [];
        let sortedCast = credits.cast;
        sortedCast.sort(function(a, b){
            return a.cast_id - b.cast_id
        })
        credits.crew.map((data)=>{
            if(data.job === "Director"){
                director = data;
            } else if(data.job === "Writer"){
                writer.push(data)
                writerName.push(data.name)
            }
        })

        console.log("DIRECTOR NJENG : ", director)

        this.setState({
            director: director,
            writerData: writer,
            writerName: writerName,
            crewList: credits.crew,
            castList: credits.cast
        })

    }

    formatDate(inputDate) {
        const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];
        var date = new Date(inputDate);
        if (!isNaN(date.getTime())) {
            this.setState({
                releaseDate : date.getDate() + ' ' + monthNames[date.getMonth()] + ' ' + date.getFullYear()
            })
        }
    }

    loadingData(isBusy){
        if(!isBusy){
            return (
                <ImageBackground 
                        source={{uri:Constant.IMAGE_URL_W500+this.props.movieDetailsData[this.state.idMovie].backdrop_path}}
                        style={{
                            width: Dimensions.get('window').width,
                            height: '100%',
                            backgroundColor: 'rgba(0,0,0,1)'
                        }}
                        imageStyle={{opacity: 0.7}}
                        >
                        <LinearGradient
                            colors={['rgba(0, 0, 0,0.0)', 'rgba(0, 0, 0,0.2)', 'rgba(219, 219, 223, 0.3)', 'rgba(219, 219, 223, 1)']}
                            style={styles.contentContainer}>

                            <Image source={{uri:Constant.IMAGE_URL_W500+this.props.movieDetailsData[this.state.idMovie].poster_path}}
                            style={styles.posterStyle}/>

                        </LinearGradient>
                        
                </ImageBackground>
            )
        } else {
            <ActivityIndicator size="large" color="#0000ff" />
        }
    }

    render() {
        return(
            <SafeAreaView style={styles.contentStyle}>
                <ScrollView style={styles.scrollStyle}>
                    <View style={styles.viewContainerStyleCrsl}>
                        {this.loadingData(this.state.isBusy)}
                        
                    </View>
                    {this.state.isBusy ? null :
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleStyle} numberOfLines={3}>{this.props.movieDetailsData[this.state.idMovie].original_title}</Text>
                        <Text style={styles.genreCategoryStyle}>{this.state.genreCategory}</Text>
                        <Text style={styles.releaseDateStyle}>{this.state.releaseDate}</Text>
                        <View style={styles.ratingSection}>
                            <StarRating
                                disabled={true}
                                containerStyle={styles.ratingContainer}
                                emptyStar={'ios-star-outline'}
                                fullStar={'ios-star'}
                                halfStar={'ios-star-half'}
                                iconSet={'Ionicons'}
                                starSize={15}
                                maxStars={5}
                                rating={this.props.movieDetailsData[this.state.idMovie].vote_average / 2}
                                // selectedStar={(rating) => this.onStarRatingPress(rating)}
                                fullStarColor={'orange'}
                            />

                            <Text style={styles.textRatingStyle}>{this.props.movieDetailsData[this.state.idMovie].vote_average}</Text>
                            <Text style={{color: '#a3a3a3'}}>/10</Text>
                        </View>
                        
                    </View>}

                    {this.state.isBusy ? null : 
                    
                        <View style={styles.descriptionContent}>
                            <View style={styles.directorContainer}>
                                <Text style={{fontWeight: '600'}}>Director: </Text>
                                <Text style={{color : '#727272'}}>{this.state.director.name}</Text>
                            </View>
                            <View style={styles.directorContainer}>
                                <Text style={{fontWeight: '600'}}>Writer: </Text>
                                {this.state.writerName.length === 0 ? 
                                <Text style={{color : '#727272'}}>-</Text> :
                                <Text style={{color : '#727272'}}>{this.state.writerName.toString().replace(/,/g,', ')}</Text>
                                }
                            </View>

                            <View style={styles.overviewStyle}>
                                <Text style={{color : '#727272', textAlign: 'justify'}}>{this.props.movieDetailsData[this.state.idMovie].overview}</Text>
                            </View>
                        </View>
                    }

                    {this.state.isBusy ? null : 
                    <View style={{flex: 1, marginHorizontal: 10}}>
                        <CardView 
                            cardElevation={5}
                            radius={10}
                            // backgroundColor={'#ffaa62'}
                            backgroundColor={'#A9623B'}
                            >
                                
                            <View style={styles.containerActor}>
                                <Text style={{paddingHorizontal: 15, fontWeight: '600', fontSize: 18}}>Casts</Text>
                                {Platform.OS === 'android' ? 
                                    <View style={styles.containerFloatingAndroid}>
                                        <FlatList
                                        style={styles.flatListActor}
                                        data={this.state.castList}
                                        horizontal={true}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({item}) => (
                                            <ListActor 
                                                imageActor={Constant.IMAGE_URL_W500+item.profile_path}
                                                actorName={item.name}
                                                playingAs={item.character}
                                            />
                                        )}
                                        /> 

                                    </View>
                                    :
                                    <View style={styles.containerFloating}>
                                        <FlatList
                                            style={styles.flatListActor}
                                            data={this.state.castList}
                                            horizontal={true}
                                            keyExtractor={(item, index) => index.toString()}
                                            renderItem={({item}) => (
                                                <ListActor 
                                                    imageActor={Constant.IMAGE_URL_W500+item.profile_path}
                                                    actorName={item.name}
                                                    playingAs={item.character}
                                                />
                                            )}
                                        />
                                    </View>
                                }
                            </View>
                            <View style={{flex: 1, marginTop:20}}>
                                <Text style={{paddingHorizontal: 15, fontWeight: '600', fontSize: 18}}>Review</Text>
                                
                                {Platform.OS === 'android' ? 
                                    <View style={styles.containerReviewFloatingAndroid}>
                                        <FlatList
                                        style={styles.flatListReview}
                                        data={this.state.movieReview}
                                        horizontal={true}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({item}) => (
                                            <ListReview
                                                reviewerName={item.author}
                                                reviewContent={item.content}
                                            />
                                        )}
                                        /> 

                                    </View>
                                    :
                                    <View style={styles.containerReviewFloating}>
                                    <FlatList
                                        style={styles.flatListReview}
                                        data={this.state.movieReview}
                                        horizontal={true}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({item}) => (
                                            <ListReview
                                                reviewerName={item.author}
                                                reviewContent={item.content}
                                            />
                                        )}
                                    />
                                    </View>
                                }

                            </View>
                        </CardView>
                    </View>

                    }
                    
                </ScrollView>
            </SafeAreaView>
        )
    }
  }
   
  const styles = StyleSheet.create({
    contentStyle:{
        flex: 1,
        backgroundColor: '#dbdbdf',
        paddingTop: 0
    },
    scrollStyle: {
        height: '100%',
        width: '100%',
        backgroundColor: '#dbdbdf'
    },
    viewContainerStyleCrsl:{
        height: Dimensions.get('window').height * 0.25,
        width: '100%',
        flexDirection: 'column'
    },
    contentContainer: {
        flex : 1,
        paddingTop: 50,
        paddingHorizontal: 20,
        paddingVertical: 20,
        overflow:'visible',
        alignSelf: 'stretch',
      },
    posterStyle:{
        position: 'absolute',
        right: 0,
        bottom: 0,
        marginRight: 20,
        marginBottom: -100,
        height: Dimensions.get('window').width * 0.5,
        width: Dimensions.get('window').width * 0.34,
    },
    titleContainer: {
        flex: 1,
        width: Dimensions.get('window').width * 0.58,
        height: Dimensions.get('window').height * 0.232,
        marginLeft: 10,
        marginTop: Dimensions.get('window').height * -0.12,
        justifyContent: "center",
    },
    titleStyle:{
        fontSize: 25,
        fontWeight: '600',
        color: "#eee",
        textShadowColor: 'rgba(0, 0, 0, 0.9)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
        padding: 5,
    },
    ratingContainer:{
        flex: 0.45,
        marginLeft: 5,
    },
    ratingSection:{
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    textRatingStyle:{
        marginLeft: 10,
        fontSize: 24,
        fontWeight: '600',
        color: 'orange',
    },
    genreCategoryStyle:{
        fontSize: 11,
        color: '#a3a3a3',
        marginLeft: 5
    },
    releaseDateStyle: {
        fontSize: 11,
        color: '#a3a3a3',
        marginTop: 5,
        marginLeft: 5
    },
    descriptionContent:{
        flex: 1,
        // height: Dimensions.get('window').height * 0.25,
        justifyContent: 'flex-start',
        marginTop: 10,
        paddingTop: 10,
        paddingHorizontal: 15,
        paddingBottom: 30
    },
    directorContainer: {
        flexDirection: 'row',
        marginVertical: 2
    },
    overviewStyle: {
        marginTop: 15,
    },
    flatListActor:{
        paddingTop: 10
    },
    containerActor: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10
    },
    containerFloating: {
        paddingBottom: 10,
        paddingTop: 5,
        marginHorizontal: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 2,
    },
    containerFloatingAndroid: {
        paddingBottom: 10,
        paddingTop: 5,
        marginHorizontal: 10,
        borderRadius: 10,
    },
    containerReviewFloating: {
        paddingBottom: 10,
        paddingTop: 5,
        marginHorizontal: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
    },
    containerReviewFloatingAndroid:{
        paddingBottom: 10,
        paddingTop: 5,
        marginHorizontal: 0,
        borderRadius: 10,
    },
    flatListReview:{
        flex: 1,
    }
})

const mapStateToProps = state => {
    console.log("MOVIE DETAIL NARO STATE")
    return {
        movieDetailsData: state.movieDetailData.movieDetail,
        genreList: state.movieList.genreList.genres,
    }
}

const mapDispatchToProps = dispatch => {
    // console.log("MAP DISPATCH TO PROPS ", dispatch)
    return {
        getMovieDetail: (movieDetail, id) => {
            dispatch(addMovieDetails(movieDetail, id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailMovie)