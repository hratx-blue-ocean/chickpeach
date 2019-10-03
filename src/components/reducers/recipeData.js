import { dummyIngredients, dummySearchRecipeArray } from '../../../db/initialData.js'

const defaultState = {
  recipes: dummySearchRecipeArray
};

const menu = (state = defaultState, action) => {
  if (action.type === 'UPDATE') {
    let newState = {
      recipes: action.recipes
    };
    return newState;
  }
  
  return state;
}

export { menu };