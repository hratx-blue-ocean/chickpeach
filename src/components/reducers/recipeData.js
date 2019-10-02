import { dummyIngredients, dummySearchRecipeArray } from '../../../db/initialData.js'

const recipeList = (state=dummySearchRecipeArray, action) => {
  if(action.type === 'UPDATE') {
    let newState = {}
    newState.recipes = action.recipes
  }

  return state;
}



export { recipeList };