import { combineReducers } from 'redux';

import userCountries from './userCountries'
import computerCountries from './computerCountries';
import listOfCountries from './listOfCountries';
import gameData from './gameData';

export default combineReducers({
  gameData,
  listOfCountries,
  userCountries,
  computerCountries
})