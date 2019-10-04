import { dummyIngredients, dummySearchRecipeArray } from '../../../db/initialData.js'

const defaultState = {
  view: 'Menu',
  recipes: dummySearchRecipeArray
};

const menu = (state = defaultState, action) => {
  if (action.type === 'UPDATE') {
    let newState = {
      view: state.view,
      recipes: action.recipes
    };
    return newState;
  }
  if (action.type === 'setView') {
    let newState = {
      view: action.view,
      recipes: state.recipes
    };
    return newState;
  }
  
  return state;
}

export { menu };