const initialState = {
  currentValue: [],
  userTurn: true,
  location: []
};

export default function gameData(state = initialState, action) {
  if (action.type === 'CHANGE_CURRENT_VALUE') {
    return Object.assign({}, state, {
      currentValue: action.currentValue
    });
  } else if (action.type === 'UPDATE_WHOSE_TURN') {
    return Object.assign({}, state, {
      userTurn: (!state.userTurn)
    });
  } else if (action.type === 'ADD_LOCATION'){
    return Object.assign({}, state, {
      location: action.location
    });
  }
  return state;
}

