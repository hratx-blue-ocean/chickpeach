
import { combineReducers } from 'redux';
import userPreferences from './userPreferences.js';
import AppStateReducer from './PreferanceAppState.js';
import { recipeList } from './recipeData.js'


const allReducers = combineReducers({
  AddAccountInfo: userPreferences,
  Preferences: userPreferences,
  prefAppState: AppStateReducer,
  Recipes: recipeList

});

export default allReducers;