/**
 * @format
 */

import {AppRegistry, Dimensions} from 'react-native';
import React from 'react'
import App from './App';
import Dashboard from './src/features/dashboard/dashboard'
import LoginPage from './src/features/login/login'
import {name as appName} from './app.json';
import configureStore from './store';
import { Provider } from 'react-redux'

const store = configureStore()

// if (!__DEV__) {
//     global.console.log = () => {}
//     global.console.warn = () => {}
//     global.console.error = () => {}
// }

const RNRedux = () => (
    <Provider store = {store}>
        <App/>
    </Provider>
)

AppRegistry.registerComponent(appName, () => RNRedux);
