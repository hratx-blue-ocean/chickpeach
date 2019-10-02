import { combineReducers } from 'redux';
import userPreferences from './userPreferences.js';
import AppStateReducer from './PreferanceAppState.js';
import { menu } from './recipeData.js'

const allReducers = combineReducers({
  AddAccountInfo: userPreferences,
  Preferences: userPreferences,
  prefAppState: AppStateReducer,
  Menu: menu,
});

export default allReducers;