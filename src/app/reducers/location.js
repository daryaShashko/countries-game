const initialState = [];

export default function location(state = initialState, action) {
  if (action.type === 'ADD_LOCATION'){
    return [
      ...state,
      action.location
    ]
  }
  return state;
}

