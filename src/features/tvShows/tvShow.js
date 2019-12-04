import React from 'react';
import { View, SafeAreaView, ScrollView, Text, StyleSheet, TextInput, Button, FlatList, Image, Dimensions, ImageBackground, Platform, StatusBar, ActivityIndicator, TouchableOpacity } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import * as Constant from '../../api/constant';
import * as Fetch from '../../api/fetchapi';
import ListTVNowPlaying from '../../redux/components/ListTVNowPlaying'
import LinearGradient from 'react-native-linear-gradient';
import { addTVShow, addNowPlayingTvShow, addTopRatedMovie, addTVShowGenre } from '../../redux/actions/effects';
import { connect } from 'react-redux';
import CardView from 'react-native-rn-cardview';

class TVShow extends React.Component {

    state = {
        activeSlide: 0,
        popularTVShow: [],
        nowPlayingTVShow: [],
        topRatedTVShow: [],
        tvShowGenreList: [],
    }

    UNSAFE_componentWillMount() {
        console.log("INI COMPONENT WILL MOUNT TVSHOW ", this.props.popularTVShow)
        Fetch.request('GET', '/tv/popular', '&language=en-US&page=1').then((res) => {
            this.props.addPopularTvShow(res.results)
        })
        Fetch.request('GET', '/tv/on_the_air', '&language=en-US&page=1').then((res) => {
            this.props.addNowPlayingTvShow(res.results)
        })
        Fetch.request('GET', '/tv/top_rated', '&language=en-US&page=1').then((res) => {
            this.props.addTopRatedTvShow(res.results)
        })
        Fetch.request('GET', '/genre/tv/list', '&language=en-US').then((res) => {
            console.log("RESPON : ", res)
            this.props.addGenreList(res.genres)
        })
    }

    render() {
        return (
            <SafeAreaView style={styles.contentStyle}>
                <LinearGradient
                    colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0,0.6)', 'rgba(0, 0, 0, 0.4)', 'rgba(219, 219, 223, 0.5)']}
                    style={styles.contentContainer}>
                    <ScrollView style={styles.scrollStyle}>
                        <View style={{ flex: 1, marginTop: 15, marginHorizontal: 10, alignItems: 'center' }}>
                            <Text style={styles.titleTvShowCarousel}>Popular TV Show</Text>
                        </View>
                        <View style={styles.viewContainerStyleCrsl}>
                            {this.props.popularTVShow ? 
                                <Carousel
                                    data={this.props.popularTVShow}
                                    loop={true}
                                    containerCustomStyle={{
                                        flex: 1,
                                    }}
                                    sliderWidth={Dimensions.get('window').width}
                                    itemWidth={Dimensions.get('window').width * 0.7}
                                    onSnapToItem={(index) => this.setState({ activeSlide: index })}
                                    renderItem={this.renderItem}
                                    inactiveSlideScale={1}
                                    inactiveSlideOpacity={0.8}
                                    activeSlideAlignment='center'
                                    layoutCardOffset={18}
                                    layout='stack'
                                // useScrollView={true}
                                />
                                :
                                null
                            }
                        </View>
                        <View style={{ flex: 1, marginTop: 30, marginHorizontal: 15, marginBottom: 20 }}>
                            <CardView
                                cardElevation={10}
                                radius={15}
                                backgroundColor={'#606060'}>
                                <View style={{ flex: 1, margin: 15 }}>
                                    <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: Platform.OS === 'android' ? 10 : null }}>
                                        <Text style={styles.nowPlayingTvShowCarousel}>Now Playing</Text>
                                        <Text style={styles.showAll}>Show All</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <View style={styles.containerFloating}>
                                            <FlatList
                                                style={styles.flatListContent}
                                                data={this.props.nowPlayingTVShow.slice(0,5)}
                                                horizontal={true}
                                                keyExtractor={(item, index) => index.toString()}
                                                renderItem={({ item }) => (
                                                    <ListTVNowPlaying
                                                        imageUrl={Constant.IMAGE_URL_W500 + item.poster_path}
                                                        titleMovie={item.original_name}
                                                        movieGenre={item.genre_ids}
                                                        movieGenreList={this.props.tvShowGenreList}
                                                        rating={item.vote_average}
                                                    />
                                                )}
                                            />
                                        </View>
                                    </View>
                                </View>
                                <View style={{ flex: 1, margin: 15 }}>
                                    <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: Platform.OS === 'android' ? 10 : null }}>
                                        <Text style={styles.nowPlayingTvShowCarousel}>Top Rated</Text>
                                        <Text style={styles.showAll}>Show All</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <View style={styles.containerFloating}>
                                            <FlatList
                                                style={styles.flatListContent}
                                                data={this.props.topRatedTVShow.slice(0,5)}
                                                horizontal={true}
                                                keyExtractor={(item, index) => index.toString()}
                                                renderItem={({ item }) => (
                                                    <ListTVNowPlaying
                                                        imageUrl={Constant.IMAGE_URL_W500 + item.poster_path}
                                                        titleMovie={item.original_name}
                                                        movieGenre={item.genre_ids}
                                                        movieGenreList={this.props.tvShowGenreList}
                                                        rating={item.vote_average}
                                                    />
                                                )}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </CardView>
                        </View>
                    </ScrollView>
                </LinearGradient>

            </SafeAreaView>
        );
    }

    renderItem = ({ item, index }) => {
        // console.log("GAMBARNYA APA DULU ", item.original_name)
        let imageUrl = Constant.IMAGE_URL_W500 + item.poster_path
        return (
            <View style={styles.slide}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailTVShow',{
                    title: item.original_name,
                    id: item.id,
                    movieGenre: item.genre_ids,
                    listGenre: this.props.tvShowGenreList
                })}>
                    <ImageBackground style={{
                        width: Platform.OS === 'ios' ? Dimensions.get('window').width * 0.55 : Dimensions.get('window').width * 0.5,
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,1)',
                        borderRadius: 20,
                        shadowColor: '#000',
                        shadowOffset: { width: 1, height: 2 },
                        shadowOpacity: 1,
                        shadowRadius: 5,
                        elevation: 2
                    }}
                        source={{ uri: imageUrl }}
                        imageStyle={{ opacity: 0.9, borderRadius: 20 }}>
                    </ImageBackground>

                </TouchableOpacity>
            </View>

        );
    }

    get pagination() {
        const { activeSlide } = this.state;
        return (
            <Pagination
                dotsLength={this.state.data.length}
                activeDotIndex={activeSlide}
                containerStyle={{ height: 20, width: 50, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}
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

}


const styles = StyleSheet.create({
    contentStyle: {
        flex: 1,
        backgroundColor: '#dbdbdf',
        paddingTop: 0
    },
    scrollStyle: {
        backgroundColor: 'transparent'
    },
    contentContainer: {
        flex: 1,
        overflow: 'visible',
        alignSelf: 'stretch',
    },
    viewContainerStyleCrsl: {
        height: Platform.OS === 'ios' ? Dimensions.get('window').height * 0.43 : Dimensions.get('window').height * 0.5,
        paddingLeft: Platform.OS === 'ios' ? Dimensions.get('window').width * 0.07 : Dimensions.get('window').width * 0.1,
        paddingTop: 20,
        justifyContent: 'center',
        flexDirection: 'column',
    },
    carousel: {
        flex: 1,
    },
    slide: {
        flex: 1,
        width: Dimensions.get('window').width * 0.8,
        marginBottom: 20,
        height: '100%',
    },
    gradientContainer: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
        paddingVertical: 20,
        overflow: 'hidden',
        alignSelf: 'stretch',
        borderRadius: 6,
    },
    titleTvShowCarousel: {
        fontSize: 20,
        fontWeight: '600',
        color: "#eee",
        textShadowColor: 'rgba(0, 0, 0, 0.9)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 5,
    },
    nowPlayingTvShowCarousel: {
        flex: 0.5,
        fontSize: 25,
        fontWeight: '600',
        color: "#eee",
        textShadowColor: 'rgba(0, 0, 0, 0.9)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 3,
    },
    showAll: {
        flex: 0.5,
        fontSize: 14,
        fontWeight: '600',
        alignSelf: 'center',
        textAlign: 'right',
        color: "#eee",
        textShadowColor: 'rgba(0, 0, 0, 0.9)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 2,
    },
    containerFloating: {
        paddingBottom: 10,
        paddingTop: 5,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: Platform.OS === 'ios' ? 2 : null,
    },
    flatListContent: {
        paddingTop: 10
    },
})

const mapStateToProps = state => {
    return {
        popularTVShow: state.tvShowList.popularTVShow,
        nowPlayingTVShow: state.tvShowList.nowPlayingTVShow,
        topRatedTVShow: state.tvShowList.topRatedTVShow,
        tvShowGenreList: state.tvShowList.tvShowGenreList
    }
}

const mapDispatchToProps = dispatch => {
    // console.log("MAP DISPATCH TO PROPS ", dispatch)
    return {
        addPopularTvShow: (tvShow) => {
            dispatch(addTVShow(tvShow))
        },
        addNowPlayingTvShow: (nowPlaying) => {
            dispatch(addNowPlayingTvShow(nowPlaying))
        },
        addTopRatedTvShow: (topRated) => {
            dispatch(addTopRatedMovie(topRated))
        },
        addGenreList: (genreList) => {
            dispatch(addTVShowGenre(genreList))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TVShow)