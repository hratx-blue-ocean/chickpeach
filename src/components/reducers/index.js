import { combineReducers } from 'redux';
import userPreferences from './userPreferences.js';
import AppStateReducer from './PreferanceAppState.js';

const allReducers = combineReducers({
  AddAccountInfo: userPreferences,
  Preferences: userPreferences,
  prefAppState: AppStateReducer
});

export default allReducers;