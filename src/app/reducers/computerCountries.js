const initialState = [];

export default function computerCountries(state = initialState, action) {
  if (action.type === 'ADD_COMPUTER_COUNTRY') {
    return [
      ...state,
      action.country
    ]
  }
  return state;
}

