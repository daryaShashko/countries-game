const initialState = [];

export default function userCountries(state = initialState, action) {
  if (action.type === 'ADD_USER_COUNTRY') {
    return [
      ...state,
      action.country
    ]
  }  else if(action.type === "START_AGAIN_THE_GAME"){
    return []
  }
  return state;
}
