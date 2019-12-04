import React from 'react';
import { View, SafeAreaView, ScrollView, Text, StyleSheet, TextInput, Button, FlatList, Image, Dimensions, ImageBackground, Platform, StatusBar, ActivityIndicator, TouchableOpacity, Alert,KeyboardAvoidingView} from 'react-native'
import { connect } from 'react-redux';
import * as Fetch from '../../api/fetchapi'
import * as Constant from '../../api/constant'
import { login } from '../../redux/actions/effects';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {isEmpty} from '../../utils/validate'
import Loader from '../../components/loadingScreen'

class LoginPage extends React.Component {
    // /g3JsScc7mQCfc3e5e5rXwu7xVVP.jpg

    state = {
        isError: false,
        isBusy: false,
        email: '',
        emailErr: '',
        isErrorEmail: undefined,
        password: '',
        passwordErr: '',
        isErrorPassword: undefined,
    }


    render() {
      return (
        <View style={{flex: 1, backgroundColor: '#000000'}}>
            <Loader loading={this.state.isBusy}/>
            <ImageBackground 
                source={{uri:Constant.IMAGE_URL+'/g3JsScc7mQCfc3e5e5rXwu7xVVP.jpg'}}
                style={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height * 0.6,
                    position: 'absolute',
                    top: 0,
                    backgroundColor: 'rgb(0,0,0)'
                }}
                    imageStyle={{resizeMode: 'cover', opacity: 0.8}}>

                    <LinearGradient
                        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 1)']}
                        style={styles.gradientContainer}>

                    </LinearGradient>
                </ImageBackground>
                <ScrollView contentContainerStyle={{
                    flex: 1,
                    position: 'absolute',
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height,
                    justifyContent: 'flex-end', alignItems: 'center'
                }}>
                    <KeyboardAvoidingView behavior="padding" enabled>
                        <View>
                            <View style={styles.contentContainerLogin}>
                                <Text style={styles.loginTitleLabel}>Login To Your Account</Text>
                                <View style={styles.formLoginContainer}>
                                    <View style={styles.userNameContainer}>
                                        <View style={styles.userNameField}>
                                            <View style={styles.iconUserNameContainer}>
                                                <Icon name="ios-person" size={25} color="#767676" />
                                            </View>
                                            <TextInput 
                                                style={styles.textInputLoginStyle}
                                                placeholder= 'Email'
                                                placeholderTextColor= '#767676'
                                                value={this.state.email}
                                                onChangeText={(text)=>{this.setState({
                                                    email: text,
                                                    isErrorEmail: false
                                                })}}
                                            />
                                        </View>
                                        {this.state.isErrorEmail ? 
                                            <View style={styles.containerError}>
                                                <Text style={{color: '#eee', fontSize: 10}}>{this.state.emailErr}</Text>
                                            </View>
                                            :
                                            null
                                        }
                                    </View>

                                    <View style={styles.userNameContainer}>
                                        <View style={styles.userNameField}>
                                            <View style={styles.iconUserNameContainer}>
                                                <Icon name="ios-key" size={25} color="#767676" />
                                            </View>
                                            <TextInput 
                                                style={styles.textInputLoginStyle}
                                                secureTextEntry={true}
                                                placeholder= 'Password'
                                                placeholderTextColor= '#767676'
                                                value={this.state.password}
                                                onChangeText={(text)=>{this.setState({
                                                    password: text,
                                                    isErrorPassword: false
                                                })}}
                                            />
                                        </View>
                                        {this.state.isErrorPassword ? 
                                            <View style={styles.containerError}>
                                                <Text style={{color: '#eee', fontSize: 10}}>{this.state.passwordErr}</Text>
                                            </View>
                                            :
                                            null
                                        }
                                    </View>

                                    <TouchableOpacity 
                                        style={{height: 25, alignSelf: 'flex-end', marginBottom: 20}}
                                        onPress={() => this.props.navigation.navigate('ForgotPassword')}>
                                        <View style={{flex: 1}}>
                                            <Text style={{color: '#eee', fontSize: 12}}>Forgot Password?</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity 
                                        style={styles.buttonSignInStyle}
                                        onPress={()=> this.login()}>
                                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                            <Text style={{color: '#eee', fontWeight: '500'}}>SIGN IN</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity 
                                        style={{height: 30, alignSelf: 'center', bottom: 0}}
                                        onPress={()=> this.props.navigation.navigate('Register')}>
                                        <View style={{flex: 1}}>
                                            <Text style={{color: '#eee', fontSize: 12}}>Don't have account? Create Now >></Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    
                    </KeyboardAvoidingView>

                </ScrollView>

        </View>
      );
    }

    login(){
        if(isEmpty(this.state.email)){
            this.setState({
                isErrorEmail: true,
                emailErr: 'Email cannot empty',
            })
        }

        if(isEmpty(this.state.password)){
            this.setState({
                isErrorPassword: true,
                passwordErr: 'Password cannot empty',
            })
        }

        if(this.state.isErrorEmail === false && this.state.isErrorPassword === false){
            this.setState({
                isBusy: true
            })
            console.log("UYE")
            let data = {
                email: this.state.email,
                password: this.state.password
            }
            this.props.login(data)
            .then(({exists, user}) => {
                console.log("BALIK KESINI KAGA ", exists)
                if(exists){
                    console.log("BALIK KESINI KAGA WOI")
                    this.setState({
                        isBusy: false
                    })
                    this.props.navigation.replace('DasboardInitial')
                } else {
                    
                }
            },(error)=>{
                Alert.alert(
                    'Alert',
                    error.message,
                    [
                      {text: 'OK', onPress: () => {
                        this.setState({
                            isBusy: false
                        })
                      }},
                    ],
                    { cancelable: false }
                  )
            })
            .catch(this.onError)
        }
    }
  }

  const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
        overflow: 'visible',
        alignSelf: 'stretch',
    },
    contentContainerLogin: {
        flex: 0.45,
        alignItems: 'center',
        width: Dimensions.get('window').width,
        marginTop: -30,
        paddingBottom: 50,
    },
    loginTitleLabel:{
        color: '#eee',
        fontSize: 20,
        fontWeight: '400',
    },
    formLoginContainer: {
        flex: 1,
        width: '80%',
        padding: 15,
        marginHorizontal: 30,
        marginVertical: 15,
        alignItems: 'center'
    },
    userNameContainer: {
        width: '100%',
        height: 60,
        flexDirection: 'column',
        marginBottom: 5,
    },
    userNameField: {
        flex: 0.75,
        flexDirection: 'row',
    },
    containerError: {
        flex: 0.25,
        backgroundColor: '#ae1919',
        borderRadius: 3,
        marginTop: 2,
        alignItems: 'center',
    },
    iconUserNameContainer: {
        flex: 0.15,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#383838',
        borderWidth: 1,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
    },
    textInputLoginStyle: {
        flex: 0.85,
        borderColor: '#383838',
        color: '#eee',
        paddingHorizontal: 10,
        borderWidth: 1,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5
    },
    buttonSignInStyle: {
        width: '100%',
        height: 45,
        flexDirection: 'row',
        marginBottom: 15,
        borderRadius: 5,
        backgroundColor: '#383838',
        alignItems: 'center',
        justifyContent: 'center',
    }
  })

  export default connect(null, {login})(LoginPage)