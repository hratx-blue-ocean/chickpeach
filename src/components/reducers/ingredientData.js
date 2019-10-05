const defaultState = {
    ingredients: []
  };
  
  const ingredients = (state = defaultState, action) => {
    if (action.type === 'setIngredients') {
      let newState = {
        ingredients: action.ingredients
      };
      return newState;
    }
    return state;
  }
  
  export { ingredients };