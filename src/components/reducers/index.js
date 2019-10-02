import {combineReducers} from 'redux'
import userPreferences from './userPreferences.js'

const allReducers = combineReducers({
  AddAccountInfo: userPreferences,
  Preferences: userPreferences
});

export default allReducers;