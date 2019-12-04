import {GET_MOVIE_DETAILS, ADD_CONVERTED_GENRE} from '../actions/types'

const initialState = {
    movieDetail: [],
    convertedGenre: [],
  };
  
  const movieDetailReducer = (state = initialState, action) => {
    switch(action.type) {

      case GET_MOVIE_DETAILS:
        return {
          ...state,
          movieDetail: {
              ...state.movieDetail,
              [action.id]:action.payload
          }
        };

      case ADD_CONVERTED_GENRE:
        console.log("KESINI GAK MOVIE GENRE:",state)
        return {
          ...state,
          convertedGenre: {
              ...state.convertedGenre,
              [action.id]:action.payload
          }
        };

       default:
        return state;
    }
  }
  
  export default movieDetailReducer;