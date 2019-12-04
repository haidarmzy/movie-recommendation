import React from 'react';
import { View, SafeAreaView, ScrollView, Text, StyleSheet, TextInput, Button, FlatList, Image, Dimensions, ImageBackground, Platform, StatusBar, ActivityIndicator, TouchableOpacity, Picker, Modal } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import * as Constant from '../../api/constant';
import * as Fetch from '../../api/fetchapi';
import ListTVNowPlaying from '../../redux/components/ListTVNowPlaying'
import LinearGradient from 'react-native-linear-gradient';
import { addTVShow, addTVShowDetailData, getSeasonDetailData,} from '../../redux/actions/effects';
import { connect } from 'react-redux';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/Ionicons';
import CardView from 'react-native-rn-cardview';

class DetailTVShow extends React.Component {

    state = {
        tvShowDetailData: [],
        tvGenreList: [],
        genreTV: [],
        idTvShow: undefined,
        isBusyHeader: false,
        releaseDate: '',
        showPicker: false,
        creator: [],
        seasonPicker: 'Season 1',
        currentLabelSeason: undefined,
        currentIdSeason: undefined,
        tvShowSeasonDetail: [],
        seasonDetailBusy: undefined

    }

    UNSAFE_componentWillMount(){
        let genreText = [];
        let genreTV = this.props.navigation.getParam('movieGenre');
        console.log("genre tv show 1", this.props.navigation.getParam('movieGenre'))
        if(genreTV !== undefined && this.props.tvGenreList !== undefined){
            for(let i=0; i<genreTV.length; i++){
                for(let j=0; j<this.props.tvGenreList.length; j++){
                    if(genreTV[i] === this.props.tvGenreList[j].id){
                        genreText.push(this.props.tvGenreList[j].name)
                    }
                }
            }
            console.log("genre tv show ", genreText)
        }
        this.setState({
            idTvShow: this.props.navigation.getParam('id'),
            genreTV: genreText.toString().replace(/,/g,' | '),
            isBusyHeader: true
        })
        Fetch.request('GET', '/tv/'+this.props.navigation.getParam('id'), '&language=en-US').then((res)=>{
            console.log("RESPON DETAIL ", res)
            this.props.addTVShowDetail(res, this.props.navigation.getParam('id'))
            this.formatDate(this.props.tvShowDetailData[this.state.idTvShow].first_air_date)
            this.getPeople(this.props.tvShowDetailData[this.state.idTvShow].created_by)
            this.props.tvShowDetailData[this.state.idTvShow].seasons.map((data)=>{
                if(data.name === "Season 1"){
                    console.log("masuk season dulu dong")
                    this.setState({
                        currentLabelSeason: data.name,
                        currentIdSeason: data.id
                    })
                    this.getTVShowSeasonDetail(this.state.idTvShow, data.season_number)
                }
            })
            this.setState({
                isBusyHeader: false
            })
        })
    }

    getTVShowSeasonDetail(tv_id, season_number){
        this.setState({
            seasonDetailBusy: true
        })
        Fetch.request('GET', '/tv/'+ tv_id +'/season/'+season_number, '&language=en-US').then((res)=>{
            console.log("RESPON DETAIL SEASON ", res)
            this.setState({
                seasonDetailBusy: false
            })
            this.props.addSeasonDetailData(res, tv_id, res.id);
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

    getPeople(createdby){
        let creator = [];
        createdby.map((data)=>{
            creator.push(data.name)
        })

        this.setState({
            creator: creator,
        })

    }

    togglePicker(){
        this.setState({
            showPicker: true
        })
    }

    pickerChange(id, index){
        this.props.tvShowDetailData[this.state.idTvShow].seasons.map( (v,i)=>{
            if(id === v.id){
                if(v.season_number === i){
                    console.log("FILTER I NYA ", i)
                    console.log("FILTER MAP MATCH", v.season_number)
                    console.log("FILTER MAP MATCH 2", this.props.tvShowDetailData[this.state.idTvShow].seasons[v.season_number].id)
                    this.setState({
                        currentLabelSeason: this.props.tvShowDetailData[this.state.idTvShow].seasons[v.season_number].name,
                        currentIdSeason: this.props.tvShowDetailData[this.state.idTvShow].seasons[v.season_number].id
                    })
                    this.getTVShowSeasonDetail(this.state.idTvShow, v.season_number)
                } 
                else {
                    console.log("ELSE FILTER I NYA ", i)
                    console.log("ELSE FILTER MAP MATCH", v.season_number)
                    console.log("ELSE FILTER MAP MATCH 2", this.props.tvShowDetailData[this.state.idTvShow].seasons[i].id)
                    this.setState({
                        currentLabelSeason: this.props.tvShowDetailData[this.state.idTvShow].seasons[i].name,
                        currentIdSeason: this.props.tvShowDetailData[this.state.idTvShow].seasons[i].id
                    })
                    this.getTVShowSeasonDetail(this.state.idTvShow, v.season_number)
                }
            }
        })
    }

    render() {
        return (
            <SafeAreaView style={styles.contentStyle}>
                <LinearGradient
                    colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0,0.6)', 'rgba(0, 0, 0, 0.4)', 'rgba(219, 219, 223, 0.5)']}
                    style={styles.contentContainer}>
                    <ScrollView style={styles.scrollStyle}>
                        {this.state.isBusyHeader ? 
                            <View style={styles.viewBackgroundHeader}>
                                <ImageBackground 
                                    style={{
                                        width: Dimensions.get('window').width,
                                        height: '100%',
                                        backgroundColor: 'rgba(0,0,0,1)'
                                    }}
                                    imageStyle={{opacity: 0.7}}
                                    >
                                    <LinearGradient
                                        colors={['rgba(0, 0, 0,0.7)', 'rgba(0, 0, 0,0.3)', 'rgba(96, 96, 96, 0.5)', 'rgba(96, 96, 96, 0.9)']}
                                        style={styles.contentContainer}>

                                    </LinearGradient>
                                    
                                </ImageBackground> 
                            </View>
                            : 
                            <View style={styles.viewBackgroundHeader}>
                                <ImageBackground 
                                    source={{uri:Constant.IMAGE_URL_W500+this.props.tvShowDetailData[this.state.idTvShow].backdrop_path}}
                                    style={{
                                        width: Dimensions.get('window').width,
                                        height: '100%',
                                        backgroundColor: 'rgba(0,0,0,1)'
                                    }}
                                    imageStyle={{opacity: 0.7}}
                                    >
                                    <LinearGradient
                                        colors={['rgba(0, 0, 0,0.7)', 'rgba(0, 0, 0,0.3)', 'rgba(96, 96, 96, 0.5)', 'rgba(96, 96, 96, 0.9)']}
                                        style={styles.contentContainer}>

                                        <Image source={{uri:Constant.IMAGE_URL_W500+this.props.tvShowDetailData[this.state.idTvShow].poster_path}}
                                        style={styles.posterStyle}/>

                                    </LinearGradient>
                                    
                                </ImageBackground> 
                            </View>
                        }
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleStyle} numberOfLines={3}>{this.props.navigation.getParam('title')}</Text> 
                            <Text style={styles.genreCategoryStyle}>{this.state.genreTV}</Text>
                            <Text style={styles.releaseDateStyle}>{this.state.releaseDate !== '' ? this.state.releaseDate : ''}</Text>
                            {this.props.tvShowDetailData[this.state.idTvShow] !== undefined ? 
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
                                    rating={this.props.tvShowDetailData[this.state.idTvShow].vote_average / 2}
                                    // selectedStar={(rating) => this.onStarRatingPress(rating)}
                                    fullStarColor={'orange'}
                                />

                                <Text style={styles.textRatingStyle}>{this.props.tvShowDetailData[this.state.idTvShow].vote_average}</Text>
                                <Text style={{color: '#a3a3a3'}}>/10</Text>
                            </View>
                            :
                            null
                            }
                            <Text style={{fontSize: 16, color: '#eee', marginTop: 15, marginLeft: 5}}>{this.props.tvShowDetailData[this.state.idTvShow] !== undefined ? this.props.tvShowDetailData[this.state.idTvShow].number_of_seasons > 1 ? this.props.tvShowDetailData[this.state.idTvShow].number_of_seasons + ' Seasons' : this.props.tvShowDetailData[this.state.idTvShow].number_of_seasons + ' Season' : ''}</Text>
                            <Text style={{fontSize: 16, color: '#eee', marginTop: 5, marginLeft: 5}}>{this.props.tvShowDetailData[this.state.idTvShow] !== undefined ? this.props.tvShowDetailData[this.state.idTvShow].number_of_episodes + ' Episodes' : ''}</Text>
                        </View>

                        <View style={styles.descriptionContent}>
                            <View style={styles.directorContainer}>
                                <Text style={{fontWeight: 'bold'}}>Creator: </Text>
                                <Text style={{color : '#eee'}}>{this.state.creator.toString().replace(/,/g,', ')}</Text>
                            </View>

                            <View style={styles.overviewStyle}>
                                <Text style={{color : '#eee', textAlign: 'justify'}} numberOfLines={Math.floor(Dimensions.get('window').height * 0.007)}>{this.props.tvShowDetailData[this.state.idTvShow] !== undefined ? this.props.tvShowDetailData[this.state.idTvShow].overview : ''}</Text>
                            </View>
                        </View>

                        {Platform.OS === 'ios' ? 
                            <TouchableOpacity onPress={()=>{this.togglePicker()}}>
                                <View style={{
                                    height: 40, 
                                    width: 150, 
                                    borderColor: '#eee', 
                                    borderWidth: 0.5, 
                                    borderRadius: 7, 
                                    backgroundColor: '#eee',
                                    padding: 5, 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    marginLeft: 15,
                                    }}>
                                        {this.state.currentLabelSeason !== undefined ? 
                                            <Text>{this.state.currentLabelSeason}</Text>
                                            :
                                            null
                                        }
                                </View>
                            </TouchableOpacity>
                            : null
                        }

                        {Platform.OS === 'ios' ? 
                            <Modal
                                transparent={true}
                                visible={this.state.showPicker}
                                onRequestClose={() => this.setState({showPicker: false})}
                                animationType={'fade'}>
                                {!this.state.isBusyHeader ?
                                <View style={styles.containerModalPicker}>
                                    <TouchableOpacity style={{width: '100%', alignItems: 'flex-end', paddingRight: 20}} onPress={()=> {this.setState({ showPicker: false })}}>
                                        <Text style={{color: 'blue', fontSize: 16, fontWeight: '600', textAlign: 'right'}}>DONE</Text>
                                    </TouchableOpacity>
                                    <Picker 
                                        selectedValue={this.state.currentIdSeason} 
                                        style={{height: Dimensions.get('window').height * 0.23, width: Dimensions.get('window').width, backgroundColor: '#eee'}} 
                                        onValueChange={(itemValue, itemIndex) => this.pickerChange(itemValue, itemIndex)}>
                                            {this.props.tvShowDetailData[this.state.idTvShow].seasons.map((data)=>{
                                                return <Picker.Item label={data.name} value={data.id}/>
                                            })}
                                    </Picker>
                                </View>
                                :
                                null
                                }
                            </Modal>
                            :
                                <View>
                                    {this.state.currentLabelSeason !== undefined ? 
                                            <Picker
                                                selectedValue={this.state.currentIdSeason} 
                                                style={{marginLeft: 10, height: 40, width: 200}} 
                                                onValueChange={(itemValue, itemIndex) => this.pickerChange(itemIndex)}>
                                                    {this.props.tvShowDetailData[this.state.idTvShow].seasons.map((data)=>{
                                                        return <Picker.Item key={itemIndex} label={data.name} value={data.id}/>
                                                    })}
                                            </Picker>
                                            :
                                            null
                                        }
                                </View>
                        }

                        {this.renderSeason()}


                    </ScrollView>
                </LinearGradient>
            </SafeAreaView>
        );
    }

    renderSeason(){
        if(this.props.tvShowSeasonDetail.length !== 0 && this.state.currentIdSeason !== undefined){
            if(this.props.tvShowSeasonDetail[this.state.idTvShow] !== undefined){
                return(
                    <View style={{
                        flex: 1,
                        width: Dimensions.get('window').width,
                        padding: 15,
                    }}>
                    
                    {this.renderSeasonDetail()}
    
                    </View>
                )

            }
        }
    }

    renderSeasonDetail(){
        if(this.props.tvShowSeasonDetail[this.state.idTvShow][this.state.currentIdSeason] !== undefined){
            return (
                <FlatList
                    style={styles.flatListContent}
                    data={this.props.tvShowSeasonDetail[this.state.idTvShow][this.state.currentIdSeason].episodes.filter((data)=>{
                        let date = new Date();
                        date = parseInt(date.toISOString().slice(0,10).replace(/-/g,""));
                        return (parseInt(data.air_date.split('-').join(''))) < date;
                    })}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
    
                        <ImageBackground 
                            source={{uri:Constant.IMAGE_URL_W500+item.still_path}}
                            style={{
                                width: '100%',
                                height: Dimensions.get('window').height * 0.23,
                                backgroundColor: 'rgba(0,0,0,1)',
                                marginBottom: 10,
                                borderRadius: 15
                            }}
                            imageStyle={{opacity: 0.6, borderRadius: 15}}>

                            <View style={{
                                flex: 1,
                                paddingHorizontal: 10,
                                paddingVertical: 15,
                                justifyContent: 'flex-end',
                                flexDirection: 'column',
                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: '600',
                                    color: "#ccc",
                                    textShadowColor: 'rgba(0, 0, 0, 0.9)',
                                    textShadowOffset: {width: -1, height: 1},
                                    textShadowRadius: 10,
                                    paddingHorizontal: 5,
                                }}>
                                    Episode {item.episode_number}
                                </Text>
                                <Text style={{
                                    fontSize: 25,
                                    fontWeight: '600',
                                    color: "#eee",
                                    textShadowColor: 'rgba(0, 0, 0, 0.9)',
                                    textShadowOffset: {width: -1, height: 1},
                                    textShadowRadius: 10,
                                    padding: 5,
                                }}>
                                    {item.name}
                                </Text>
                                <View style={{flexDirection: 'row', alignItems: 'flex-end', marginHorizontal: 5}}>
                                    <Icon name="ios-star" size={25} color='orange' />
                                    <Text style={styles.textRatingStyle}>{(Math.round(item.vote_average * 10) / 10).toString()}</Text>
                                    <Text style={{color: '#a3a3a3'}}>/10</Text>
                                </View>
                            </View>
                        </ImageBackground>
                    )}
                />
            )
        }
    }
}

const styles = StyleSheet.create({
    contentStyle: {
        flex: 1,
        backgroundColor: '#dbdbdf',
        paddingTop: 0
    },
    scrollStyle: {
        height: '100%',
        width: '100%',
        backgroundColor: 'transparent'
    },
    contentContainer: {
        flex: 1,
        overflow: 'visible',
        alignSelf: 'stretch',
    },
    viewBackgroundHeader: {
        height: Dimensions.get('window').height * 0.3,
        width: '100%',
        flexDirection: 'column'
    },
    posterStyle:{
        position: 'absolute',
        right: 0,
        bottom: 0,
        marginRight: 20,
        marginBottom: Platform.OS === 'ios' ? -100 : -135,
        height: Platform.OS === 'ios' ? Dimensions.get('window').width * 0.5 : Dimensions.get('window').width * 0.6,
        width: Platform.OS === 'ios' ?  Dimensions.get('window').width * 0.34 : Dimensions.get('window').width * 0.38,
    },
    titleContainer: {
        flex: 1,
        width: Dimensions.get('window').width * 0.58,
        height: Platform.OS === 'ios' ? Dimensions.get('window').height * 0.232 : Dimensions.get('window').height * 0.3,
        marginLeft: 10,
        marginTop: Dimensions.get('window').height * -0.12,
        justifyContent: "center",

        // flex: 1,
        // width: Dimensions.get('window').width * 0.58,
        // height: Platform.OS === 'ios' ? Dimensions.get('window').height * 0.232 : Dimensions.get('window').height * 0.3,
        // marginLeft: 10,
        // marginTop: Platform.OS === 'ios' ? Dimensions.get('window').height * -0.12 : Dimensions.get('window').height * -0.2,
        // justifyContent: "center",
        // backgroundColor: 'yellow'
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
    pickerContainer:{
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: 'yellow',
        marginTop: 10,
        paddingHorizontal: 15,
    },
    containerModalPicker: {
        height: Dimensions.get('window').height * 0.25, width: Dimensions.get('window').width,
        backgroundColor: '#eee',
        paddingTop: 20,
        position: 'absolute', 
        bottom: 0,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    }
})

const mapStateToProps = state => {
    console.log("MOVIE DETAIL NARO STATE ", state.tvShowDetailData.tvShowDetail)
    console.log("SEASON DETAIL NARO STATE ", state.tvShowDetailData.seasonDetail)
    return {
        tvShowDetailData: state.tvShowDetailData.tvShowDetail,
        tvGenreList: state.tvShowList.tvShowGenreList,
        tvShowSeasonDetail: state.tvShowDetailData.seasonDetail,
        tvShowEpisodes: state.tvShowDetailData.seasonDetail,
    }
}

const mapDispatchToProps = dispatch => {
    // console.log("MAP DISPATCH TO PROPS ", dispatch)
    return {
        addTVShowDetail: (tvShowDetail, id) => {
            dispatch(addTVShowDetailData(tvShowDetail, id))
        },
        addSeasonDetailData: (seasonData, id, season_number) => {
            dispatch(getSeasonDetailData(seasonData, id, season_number))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailTVShow)