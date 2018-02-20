const initialState = [];

export default function location(state = initialState, action) {
  if (action.type === 'ADD_LOCATION'){
    return [
      ...state,
      action.location
    ]
  }  else if(action.type === "START_AGAIN_THE_GAME"){
    return []
  }
  return state;
}

