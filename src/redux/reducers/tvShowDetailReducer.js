import {GET_TV_SHOW_DETAIL, GET_SEASON_DETAIL} from '../actions/types'

const initialState = {
    tvShowDetail: [],
    seasonDetail: []
  };
  
  const tvShowDetailReducer = (state = initialState, action) => {
    switch(action.type) {

      case GET_TV_SHOW_DETAIL:
        return {
          ...state,
          tvShowDetail: {
              ...state.tvShowDetail,
              [action.id]:action.payload
          }
        };

      case GET_SEASON_DETAIL:
        return {
          ...state,
          seasonDetail: {
              ...state.seasonDetail,
              // [action.id]:action.payload
              [action.id]: {
                [action.season_number]: action.payload
              }
          }
        };

       default:
        return state;
    }
  }
  
  export default tvShowDetailReducer;