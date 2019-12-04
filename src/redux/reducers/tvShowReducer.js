import { GET_TV_SHOW, GET_NOW_PLAYING_TV_SHOW, GET_TOP_RATED_TV_SHOW, GET_TV_SHOW_GENRE } from '../actions/types'

const initialState = {
    popularTVShow: [],
    nowPlayingTVShow: [],
    topRatedTVShow: [],
    tvShowGenreList: []
  };
  
  const tvShowReducer = (state = initialState, action) => {
    switch(action.type) {
      case GET_TV_SHOW:
        return {
          ...state,
          popularTVShow: action.payload
        };

      case GET_NOW_PLAYING_TV_SHOW:
        return {
          ...state,
          nowPlayingTVShow: action.payload
        };

      case GET_TOP_RATED_TV_SHOW:
        return {
          ...state,
          topRatedTVShow: action.payload
        };

      case GET_TV_SHOW_GENRE:
        return {
          ...state,
          tvShowGenreList: action.payload
        };

       default:
        return state;
    }
  }
  
  export default tvShowReducer;