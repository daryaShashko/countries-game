const initialState = [];

export default function listOfCountries(state = initialState, action) {
  if (action.type === 'ADD_COUNTRIES_LIST') {
    return [
      ...state,
      action.countriesList
    ]
  } else if(action.type === 'REMOVE_COUNTRY_FROM_LIST'){
    return [
      [...state][0].filter(el => el !== action.countriesList)
    ];

  }
  return state;
}

