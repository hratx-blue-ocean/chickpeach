import { combineReducers } from 'redux';
import userPreferences from './userPreferences.js';
import AppStateReducer from './PreferanceAppState.js';
import { menu } from './recipeData.js';
import searchData from './searchData';

const allReducers = combineReducers({
  Preferences: userPreferences,
  prefAppState: AppStateReducer,
  Menu: menu,
  search: searchData
});

export default allReducers;