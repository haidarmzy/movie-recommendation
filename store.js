import { createStore, applyMiddleware, combineReducers, compose} from 'redux'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import placeReducer from './src/redux/reducers/placeReducers'
import movieReducer from './src/redux/reducers/popularMovieReducer'
import movieDetailReducer from './src/redux/reducers/movieDetailReducer'
import tvShowReduer from './src/redux/reducers/tvShowReducer'
import tvShowDetailReducer from './src/redux/reducers/tvShowDetailReducer'
import authReducer from './src/redux/reducers/loginRegisterReducer'

const enhancer = compose(applyMiddleware(thunk))
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;

const rootReducer = combineReducers({
    places: placeReducer,
    movieList: movieReducer,
    movieDetailData: movieDetailReducer,
    tvShowList: tvShowReduer,
    tvShowDetailData: tvShowDetailReducer,
    firebaseAuth: authReducer
  });
  
  const configureStore = () => {
    return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
  }
  
  export default configureStore;