import { dummyIngredients, dummySearchRecipeArray } from '../../../db/initialData.js'

const menu = (state=dummySearchRecipeArray, action) => {
  if(action.type === 'UPDATE') {
    let newState = {}
    newState.recipes = action.recipes
  }

  return state;
}



export { menu };