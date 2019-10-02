import { dummyIngredients, dummySearchRecipeArray } from '../../../db/initialData.js'

const menu = (state=dummySearchRecipeArray, action) => {
  if(action.type === 'UPDATE') {
    let newState = {
      recipes: action.recipes
    };
    return newState;
  }
  
  return state;
}

export { menu };