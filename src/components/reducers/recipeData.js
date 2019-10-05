import { dummyIngredients, dummySearchRecipeArray } from '../../../db/initialData.js'

const defaultState = {
  view: 'Menu',
  recipes: [], // dummySearchRecipeArray,
  servings: 0
};

const menu = (state = defaultState, action) => {
  if (action.type === 'UPDATE') {
    let newState = {
      view: state.view,
      recipes: action.recipes,
      servings: state.servings
    };
    return newState;
  }
  if (action.type === 'setView') {
    let newState = {
      view: action.view,
      recipes: state.recipes,
      servings: state.servings
    };
    return newState;
  }
  if (action.type === 'setServings') {
    let newState = {
      view: state.view,
      recipes: state.recipes,
      servings: action.servings
    };
    return newState;
  }  
  return state;
}

export { menu };