import React, {Component} from 'react';
import {View, SafeAreaView, ScrollView, Text, StyleSheet, TextInput, Button, FlatList, Image, Dimensions, ImageBackground, Platform, StatusBar, ActivityIndicator} from 'react-native';
import { addPlace, addPopularMovie, addGenre } from '../../redux/actions/effects';
import { connect } from 'react-redux';
import ListPlaces from '../../redux/components/ListPlaces'
import NowPlayingList from '../../redux/components/NowPlaying'
import * as Constant from '../../api/constant'
import * as Fetch from '../../api/fetchapi'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';

class Dashboard extends Component {

    state = {
        placeName: '',
        places: [],
        nowPlayingList: [],
        genre: [],
        bannerMovie:[],
        activeSlide: 0,
        isFetchingMovie: true,
        isFetchingGenre: true,
    }

    componentDidMount(){
        this.getListGenre();
        this.getMovieData();
        if(this.props.nowPlayingList && this.props.genre){
            
        }
    }

    componentWillMount(){
        console.log("ComponentWillMount DASHBOARD ")
        this._retrieveData().then((data)=>{
            console.log("We have data 2!! ",data);
            console.log(data)
        })
    }

    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('user');
          if (value !== null) {
            console.log("We have data!! ",value);
            return(value)
          }
        } catch (error) {
            console.log("We have error!! ",error);
            return error
        }
      };

    renderItem = ({item, index}) => {
        let imageUrl = Constant.IMAGE_URL_W500 + item.backdrop_path
        return (
            <View style={styles.slide}>
                <TouchableOpacity onPress={()=>{
                    this.props.navigation.navigate('Details',{
                        title: item.original_title,
                        id: item.id,
                        movieGenre: item.genre_ids,
                    })
                }}>
                    <ImageBackground style={{
                        width: Dimensions.get('window').width, 
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,1)'
                    }} 
                    source={{ uri: imageUrl }}
                    imageStyle={{opacity: 0.7}}>
                        <LinearGradient
                            colors={['rgba(0, 0, 0,0.7)', 'rgba(0, 0, 0,0.3)', 'rgba(96, 96, 96, 0.5)', 'rgba(84, 84, 84, 1)']}
                            style={styles.contentContainer}>
                                <View 
                                    style={{
                                        position: 'absolute',
                                        bottom: 25,
                                        alignSelf: 'flex-start',
                                        paddingLeft: 20,
                                    }}>
                                    <Text 
                                        style={{
                                            padding: 5,
                                            fontSize: Math.floor(Dimensions.get('window').width * 0.07),
                                            textAlign: 'left',
                                            color: '#eee',
                                            fontWeight: '500',
                                            textShadowColor: 'rgba(0, 0, 0, 0.9)',
                                            textShadowOffset: {width: -1, height: 1},
                                            textShadowRadius: 10
                                        }}>
                                            {item.original_title}
                                    </Text>
                                </View>

                        </LinearGradient>
                    </ImageBackground>

                </TouchableOpacity>
            </View>
            
        );
    }

    render(){
        return(
            <SafeAreaView style={styles.contentStyle}>
                <LinearGradient
                    colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0,0.6)', 'rgba(0, 0, 0, 0.4)', 'rgba(219, 219, 223, 0.5)']}
                    style={styles.contentContainer}>
                    <ScrollView style={styles.scrollStyle}>
                        <View style={styles.viewContainerStyleCrsl}>
                            {this.props.nowPlayingList ? 
                                <Carousel
                                    data={this.props.nowPlayingList}
                                    slideStyle={{ flex: 1 }}
                                    loop={true}
                                    autoplay={true}
                                    autoplayDelay={1000}
                                    autoplayInterval={3000}
                                    containerCustomStyle={styles.carousel}
                                    sliderWidth={Dimensions.get('window').width}
                                    itemWidth={Dimensions.get('window').width}
                                    onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                                    renderItem={this.renderItem}
                                />
                                :
                                null
                            }

                            <View style={{
                                height: 30,
                                width: Dimensions.get('window').width,
                                position: 'absolute',
                                bottom: 0,
                                marginBottom: 15,
                            }}>
                                {this.pagination}
                            </View>
                        </View>

                        <View style={styles.viewContainerStyle}>
                            <Text style={{
                                fontSize:20,
                                fontWeight: '500',
                                marginBottom: 10,
                            }}>Most Popular</Text>

                            <FlatList 
                                style={styles.listContainer}
                                data={this.props.nowPlayingList}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                <NowPlayingList 
                                    movieId={item.id}
                                    titleMovie={item.original_title} 
                                    urlPoster={Constant.IMAGE_URL_W500+item.poster_path}
                                    genreList={this.props.genre}
                                    movieGenre={item.genre_ids}
                                    movieRating={item.vote_average}
                                    synopsys={item.overview}
                                    goToDetails={() => this.props.navigation.navigate('Details',{
                                        title: item.original_title,
                                        id: item.id,
                                        movieGenre: item.genre_ids,
                                    })}
                                />
                            )}/>
                        </View>
                    </ScrollView>
                </LinearGradient>
            </SafeAreaView>
        )
    }

    get pagination () {
        const { activeSlide } = this.state;
        return (
            <Pagination
              dotsLength={this.props.bannerMovie.length}
              activeDotIndex={activeSlide}
              containerStyle={{ height: 20 , width: 50, justifyContent: 'center', alignItems: 'center', alignSelf : 'center'}}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 8,
                  backgroundColor: 'rgba(255, 255, 255, 0.92)'
              }}
              inactiveDotStyle={{
                  // Define styles for inactive dots here
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
        );
    }

    async getMovieData(){
        Fetch.request('GET', '/movie/popular', '&language=en-US&page=1&region=ID')
        .then((res, error)=>{
            this.props.getPopularMovie(res)
        })
    }

    async getListGenre(){
        Fetch.request('GET', '/genre/movie/list', '&language=en-US')
        .then((res, error)=>{
            this.props.getGenreList(res)
            
        })
    }

    // buttonPressed = () => {
    //     if(this.state.placeName.trim() !== ''){
    //         this.props.add(this.state.placeName)
    //     }
    //     console.log("CLICK", this.props.places)
    // }

    // valueChanged = (val) => {
    //     this.setState({
    //         placeName : val
    //     })
    // }
}

const styles = StyleSheet.create({
    contentStyle:{
        flex: 1,
        backgroundColor: '#dbdbdf',
        paddingTop: 0
    },
    contentContainer: {
        flex: 1,
        overflow: 'visible',
        alignSelf: 'stretch',
    },
    scrollStyle: {
        backgroundColor: 'transparent'
    },
    viewContainerStyle:{
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 40
    },
    viewContainerStyleCrsl:{
        height: Platform.OS === 'ios' ? Dimensions.get('window').height * 0.28 : Dimensions.get('window').height * 0.35,
        width: '100%',
        flexDirection: 'column'
    },
    textLabelStyle:{
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10
    },
    textInputStyle:{
        margin: 10,
        paddingLeft: 10,
        paddingRight: 10,
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
        borderRadius: 10
    },
    buttonStyle:{
        width: '30%',
    },
    listContainer: {
        flex: 1
    },
    toolbarStyle:{
        position: 'absolute',
        top: 0,
        width : '100%',
        height: 50,
        backgroundColor: '#dbdbdf',
        shadowOffset:{
            width: 0,
            height: 2
        },
        shadowOpacity: 0.5
    },
    toolbarContentStyle: {
        flex: 1,
        flexDirection: 'row',
    },
    leftToolbarStyle: {
        flex: 0.15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    centerToolbarStyle: {
        flex: 0.7,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rightToolbarStyle: {
        flex: 0.15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    carousel: {
        flex: 1,
    },
    slide: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: '100%'
      }
})

const mapStateToProps = state => {
    console.log("MAP STATE TO PROPS ", state)
    console.log("MAP STATE TO PROPS 2", state.movieList)
    let banner = [];
    if(state.movieList.movieList.results){
        state.movieList.movieList.results.map((data)=>{
            banner.push({
                image: data.poster_path,
                title: data.original_title
            })
        })
    }

    return {
        places: state.places.places,
        nowPlayingList: state.movieList.movieList.results,
        genre: state.movieList.genreList.genres,
        bannerMovie: banner
    }
}

const mapDispatchToProps = dispatch => {
    // console.log("MAP DISPATCH TO PROPS ", dispatch)
    return {
        add: (name) => {
            console.log("MAP DISPATCH TO PROPS ", name)
            dispatch(addPlace(name))
        },
        getPopularMovie: (movie) => {
            dispatch(addPopularMovie(movie))
        },
        getGenreList: (genre) => {
            dispatch(addGenre(genre))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)