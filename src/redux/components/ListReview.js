import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CardView from 'react-native-rn-cardview'
import { Avatar } from 'react-native-elements';

const ListReview = (props) => {
    console.log("UKURANNYA BERAPA ", Math.floor(Dimensions.get('window').height * 0.007))
    return (
      <TouchableOpacity>
        <View style = { styles.listActorContainer }>
            <CardView 
                cardElevation={5}
                radius={20}
                backgroundColor={'#f8b79b'}>

                <View style={styles.listReviewContainer}>
                    <View style={styles.reviewerNameContainer}>
                        <Avatar
                            size={30}
                            rounded
                            title={props.reviewerName.slice(0,2).toUpperCase()}
                            onPress={() => console.log("Works!")}
                            activeOpacity={0.7}
                            containerStyle={{marginRight: 10}}
                        />
                        <Text style={{fontSize: 12, fontWeight: '600'}}>{props.reviewerName}</Text>
                    </View>
                    <Text style={{fontSize:12}} numberOfLines={Math.floor(Dimensions.get('window').height * 0.007)}>{props.reviewContent}</Text>
                </View>

            </CardView>
        </View>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    listActorContainer: {
        flex: 1,
        paddingHorizontal: 5,
    },
    listReviewContainer: {
        flex: 1,
        width: Dimensions.get('window').width * 0.85,
        height: Dimensions.get('window').height * 0.17,
        paddingVertical: 15,
        paddingHorizontal: 15
    },
    reviewerNameContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 10
    }
});

export default ListReview;
