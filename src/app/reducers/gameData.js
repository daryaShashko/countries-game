const initialState = {
  currentValue: [],
  userTurn: true,
  listOfDeletedCountries: [],
  stopGame: false
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
  } else if(action.type === "REMOVE_COUNTRY_FROM_LIST"){
    return Object.assign({}, state, {
      listOfDeletedCountries: [...state.listOfDeletedCountries, action.countriesList]
    });
  } else if(action.type === "STOP_THE_GAME"){
    return Object.assign({}, state, {
      stopGame: (!state.stopGame)
    });
  } else if(action.type === "START_AGAIN_THE_GAME"){
    return {
      currentValue: [],
      userTurn: true,
      listOfDeletedCountries: [],
      stopGame: false
    }
  }
  return state;
}

