import {GET_POPULAR_MOVIE, GET_GENRE} from '../actions/types'

const initialState = {
    movieList: [],
    genreList:[],
  };
  
  const movieReducer = (state = initialState, action) => {
    switch(action.type) {
      case GET_POPULAR_MOVIE:
        return {
          ...state,
          movieList: action.payload
        };

      case GET_GENRE:
        console.log("KESINI GAK MOVIE:",state)
        return {
          ...state,
          genreList: action.payload
        };

       default:
        return state;
    }
  }
  
  export default movieReducer;