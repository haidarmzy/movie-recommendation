import {ADD_PLACE} from '../actions/types'

const initialState = {
    placeName: '',
    places: []
  };
  
  const placeReducer = (state = initialState, action) => {
    switch(action.type) {
      case ADD_PLACE:
        console.log("KESINI GAK :",state)
        return {
          ...state,
          places: state.places.concat({
            key: Math.random(),
            value: action.payload
          })
        };
      default:
        return state;
    }
  }
  
  export default placeReducer;