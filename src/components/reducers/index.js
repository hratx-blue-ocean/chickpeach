import { combineReducers } from 'redux';
import userPreferences from './userPreferences.js';
import AppStateReducer from './PreferanceAppState.js';
import { menu } from './recipeData.js';
import { ingredients } from './ingredientData.js';
import searchData from './searchData';

const allReducers = combineReducers({
  Preferences: userPreferences,
  prefAppState: AppStateReducer,
  Menu: menu,
  Ingredients: ingredients,
  search: searchData
});

export default allReducers;