import AsyncStorage from '@react-native-community/async-storage';
import {LOGGED_IN, LOGGED_OUT} from '../actions/types'

let initialState = { 
    isLoggedIn: false, 
    user: null 
};

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case LOGGED_IN:
            const user = action.user;
            console.log("INI DI REDUCER REGIST ", user)

            // Save token and data to Asyncstorage
            AsyncStorage.multiSet([
                ['user', JSON.stringify(user)]
            ]);

            return {
                ...state, 
                isLoggedIn: true, user 
            };

        case LOGGED_OUT:
            let keys = ['user'];
            AsyncStorage.multiRemove(keys);

            return {
                ...state, 
                isLoggedIn: false, 
                user: null
            };

        default:
            return state;
    }
}

export default authReducer;