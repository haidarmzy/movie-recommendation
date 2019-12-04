import React, {Component} from 'react';
import { Text, View, Image, Platform } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Dashboard from './src/features/dashboard/dashboard'
import DetailMovie from './src/features/detailMovie/detailMovie'
import SearchMovie from './src/features/searchMovie/searchMovie'
import TVShow from './src/features/tvShows/tvShow'
import DetailTVShow from './src/features/detailMovie/detailTVShow'
import LoginPage from './src/features/login/login'
import RegisterPage from './src/features/register/register'
import ForgotPassword from './src/features/login/forgotPassword'
import MyAccount from './src/features/myaccount/myAccount'
import AuthPage from './src/config/authPage'
import TabBar from './src/components/TabBar'
import configureStore from './store';
import Icon from 'react-native-vector-icons/Ionicons';
import { Provider } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

const store = configureStore();

class App extends Component{

};

const DashboardStack = createStackNavigator({
  Home: {
    screen: Dashboard,
    navigationOptions: {
      headerShown: false,
      transitionSpec: {
        open: config,
        close: config,
      },
    },
  },
  Details: 
  {
    screen: DetailMovie,
    navigationOptions: {
      headerTransparent: true,
    }
  },
}, {
  initialRouteName: 'Home'
});

DashboardStack.navigationOptions = ({navigation}) => {
  let tabBarVisible;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map(route => {
      if (route.routeName === "Details") {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    });
  }

  return {
    tabBarVisible
  };
}

const TVShowStack = createStackNavigator({
  TVShowHome: {
    screen: TVShow,
    navigationOptions: {
      headerShown: false,
      transitionSpec: {
        open: config,
        close: config,
      },
    }
  },
  DetailTVShow: {
    screen: DetailTVShow,
    navigationOptions: {
      headerTransparent: true
    }
  }
})

TVShowStack.navigationOptions = ({navigation}) => {
  let tabBarVisible;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map(route => {
      if (route.routeName === "DetailTVShow") {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    });
  }

  return {
    tabBarVisible
  };
}

const TabNavigator = createBottomTabNavigator({
  //active rgb : rgba(232, 148, 28, 1)
  //inactive rgb: rgba(205, 205, 205, 1)

  Movie: {
    screen: DashboardStack,
    navigationOptions: {
      tabBarIcon: ({ focused }) => 
      focused === true ?
      <Image style={{height: 25, width: 25}} source={require('./src/assets/Icon/home-icon-active.png')}/> : 
      <Image style={{height: 25, width: 25}} source={require('./src/assets/Icon/home-icon-inactive.png')}/>
    }
  },
  'TV Show': {
    screen: TVShowStack,
    navigationOptions: {
      tabBarIcon: ({ focused }) => 
      focused === true ?
      <Image style={{height: 25, width: 25}} source={require('./src/assets/Icon/home-icon-active.png')}/> : 
      <Image style={{height: 25, width: 25}} source={require('./src/assets/Icon/home-icon-inactive.png')}/>
    }
  },
  Search: {
    screen: SearchMovie,
    navigationOptions: {
      tabBarIcon: ({ focused }) => 
      focused === true ?
      <Image style={{height: 25, width: 25}} source={require('./src/assets/Icon/search-tab-active.png')}/> : 
      <Image style={{height: 25, width: 25}} source={require('./src/assets/Icon/search-tab-inactive.png')}/>
    }
  },
  MyAccount: {
    screen: MyAccount,
    navigationOptions: {
      tabBarIcon: ({ focused }) => 
      focused === true ?
      <Icon name="ios-person" size={30} color='#e8931c' /> : 
      <Icon name="ios-person" size={30} color='#cdcdcd' /> 
    }
  }
},
{
  tabBarComponent: TabBar,
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  },
}
);

if(Platform.OS === 'ios'){
  DetailMovie.navigationOptions = ({ navigation }) => {
    return {
      headerLeft: 
        <TouchableOpacity onPress={ () => {
            navigation.goBack()
          }}>
          <Image style={{height: 30, width: 30, marginLeft: 10, marginTop: 10}} source={require('./src/assets/Icon/back-icon.png')}/> 
        </TouchableOpacity>
    }
  }
  DetailTVShow.navigationOptions = ({ navigation }) => {
    return {
      headerLeft: 
        <TouchableOpacity onPress={ () => {
            navigation.goBack()
          }}>
          <Image style={{height: 30, width: 30, marginLeft: 10, marginTop: 10}} source={require('./src/assets/Icon/back-icon.png')}/> 
        </TouchableOpacity>
    }
  }
}

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

DashboardStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
}

const LoginStack = createStackNavigator({
  Login: {
    screen: LoginPage,
    navigationOptions: {
      headerShown: false,
    }
  },
  Register: {
    screen : RegisterPage,
    navigationOptions: {
      headerTransparent: true
    }
  },
  ForgotPassword: {
    screen: ForgotPassword
  },
  DasboardInitial : {
    screen: TabNavigator,
    navigationOptions: {
      headerShown: false,
      gesturesEnabled: false,
    }
  }
})

const AppNavigation = createSwitchNavigator({
  AuthLoading :AuthPage,
  App : LoginStack
})

export default createAppContainer(AppNavigation);
