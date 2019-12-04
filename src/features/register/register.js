import React from 'react';
import { View, SafeAreaView, ScrollView, Text, StyleSheet, TextInput, Button, FlatList, Image, Dimensions, ImageBackground, Platform, StatusBar, ActivityIndicator, TouchableOpacity, Alert, KeyboardAvoidingView} from 'react-native'
import { connect } from 'react-redux';
import * as Fetch from '../../api/fetchapi'
import * as Constant from '../../api/constant'
import { addMovieDetails, register } from '../../redux/actions/effects';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Loader from '../../components/loadingScreen'
import {isEmpty, validateEmail, validatePassword, confirmPassword} from '../../utils/validate'

class RegisterPage extends React.Component {

    state = {
        isError: false,
        isBusy: false,
        username: '',
        usernameErr: '',
        isErrorUsername: undefined,
        email: '',
        emailErr: '',
        isErrorEmail: undefined,
        password: '',
        passwordErr: '',
        isErrorPassword: undefined,
        confirmPassword: '',
        confirmPasswordErr: '',
        isErrorconfirmPassword: undefined,
    }

    UNSAFE_componentWillMount(){
        console.log("DABSDJHASD ", Dimensions.get('window').height * 0.0006)
    }

    render() {
      return (
        <View style={{flex: 1, backgroundColor: '#000000'}}>
            <Loader loading={this.state.isBusy}/>
            <ImageBackground 
                source={{uri:Constant.IMAGE_URL+'/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg'}}
                style={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height * 0.6,
                    position: 'absolute',
                    top: 0,
                    backgroundColor: 'rgb(0,0,0)'
                }}
                    imageStyle={{resizeMode: 'cover', opacity: 0.3}}>

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
                <KeyboardAvoidingView 
                    behavior="padding" 
                    enabled >
                    <View>
                            <View style={styles.contentContainerLogin}>
                                <Text style={styles.loginTitleLabel}>Sign Up</Text>
                                <View style={styles.formLoginContainer}>
                                    <View style={styles.userNameContainer}>
                                        <View style={styles.userNameField}>
                                            <View style={styles.iconUserNameContainer}>
                                                <Icon name="ios-person" size={25} color="#767676" />
                                            </View>
                                            <TextInput 
                                                style={styles.textInputLoginStyle}
                                                placeholder= 'Username'
                                                placeholderTextColor= '#767676'
                                                value={this.state.username}
                                                onChangeText={(text)=>{this.setState({
                                                    username: text,
                                                    isErrorUsername: false
                                                })}}
                                            />
                                        </View>
                                        {this.state.isErrorUsername ? 
                                            <View style={styles.containerError}>
                                                <Text style={{color: '#eee', fontSize: 10}}>{this.state.usernameErr}</Text>
                                            </View>
                                            :
                                            null
                                        }
                                    </View>

                                    <View style={styles.userNameContainer}>
                                        <View style={styles.userNameField}>
                                            <View style={styles.iconUserNameContainer}>
                                                <Icon name="ios-mail" size={25} color="#767676" />
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

                                    <View style={styles.userNameContainer}>
                                        <View style={styles.userNameField}>
                                            <View style={styles.iconUserNameContainer}>
                                                <Icon name="ios-key" size={25} color="#767676" />
                                            </View>
                                            <TextInput 
                                                style={styles.textInputLoginStyle}
                                                secureTextEntry={true}
                                                placeholder= 'Confirm Password'
                                                placeholderTextColor= '#767676'
                                                value={this.state.confirmPassword}
                                                onChangeText={(text)=>{this.setState({
                                                    confirmPassword: text,
                                                    isErrorconfirmPassword: false
                                                })}}
                                            />
                                        </View>
                                        {this.state.isErrorconfirmPassword ? 
                                            <View style={styles.containerError}>
                                                <Text style={{color: '#eee', fontSize: 10}}>{this.state.confirmPasswordErr}</Text>
                                            </View>
                                            :
                                            null
                                        }
                                    </View>

                                    <TouchableOpacity style={styles.buttonSignInStyle} onPress={()=>{this.signUp()}}>
                                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                            <Text style={{color: '#eee', fontWeight: '500'}}>SIGN UP</Text>
                                        </View>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </View>

                </KeyboardAvoidingView>

            </ScrollView>

        </View>

        // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        //   <Text>REGISTER</Text>
        // </View>
      );
    }

    showAlert(msg){
        Alert.alert(
            'Alert',
            msg,
            [
              {text: 'OK', onPress: () => {
                this.setState({
                    isBusy: false
                })
              }},
            ],
            { cancelable: false }
          )
    }

    signUp(){
        let isError = false

        if(isEmpty(this.state.username)){
            console.log("KOSONG")
            this.setState({
                isErrorUsername: true,
                usernameErr: 'Username cannot empty',
            })
        }
        
        if(isEmpty(this.state.email)){
            this.setState({
                isErrorEmail: true,
                emailErr: 'Email canot empty',
            })
        } else if(!validateEmail(this.state.email)){
            console.log("VALIDATE EMAIL BENER GA ", validateEmail(this.state.email))
            this.setState({
                isErrorEmail: true,
                emailErr: 'Enter a valid email address',
            })
        }
        
        if(isEmpty(this.state.password)){
            this.setState({
                isErrorPassword: true,
                passwordErr: 'Password cannot empty',
            })
        } else if(!validatePassword(this.state.password)){
            this.setState({
                isErrorPassword: true,
                passwordErr: 'Password must be at least 6 characters',
            })
        }

        if(isEmpty(this.state.confirmPassword)){
            this.setState({
                isErrorconfirmPassword: true,
                confirmPasswordErr: 'Confirm Password cannot empty'
            })
        } else if(!confirmPassword(this.state.password, this.state.confirmPassword)){
            this.setState({
                isErrorconfirmPassword: true,
                confirmPasswordErr: 'Password not match',
            })
        }

        if(this.state.isErrorUsername === false && this.state.isErrorEmail === false && this.state.isErrorPassword === false && this.state.isErrorconfirmPassword === false){
            let dataRegister = {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            }
            console.log("DATANYA REGISTER : ", this.state.isErrorUsername)
            this.setState({
                isBusy: true
            })
            this.props.registerData(dataRegister)
                .then((res) => {
                    this.setState({
                        isBusy: false
                    })
                    this.props.navigation.navigate('Login')
                },(error)=>{
                    this.showAlert(error.message)
                    
                    console.log("Ini error",error)
                })
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
        flex: Platform.OS === 'ios' ? Dimensions.get('window').height * 0.0006 : Dimensions.get('window').height * 0.0009,
        alignItems: 'center',
        width: Dimensions.get('window').width,
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

  const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    // console.log("MAP DISPATCH TO PROPS ", dispatch)
    return {
        registerData: async (data) => {
            console.log("FIREBASE YOH", data)
            await dispatch(register(data))
        }
    }
}

  export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);