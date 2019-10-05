
const addAccountInfo = (uid, displayName, email) => {
  return {
    type: 'AddAccountInfo',
    uid: uid,
    displayName: displayName,
    email: email
  }
}

const addPreferences = (preferencesObject) => {
  return {
    type: 'Preferences',
    preferencesObject: preferencesObject,
  }
}

const IteratePageCount = () => {
  return {
    type: 'IteratePageCount',
  }
};

const DecrementPageCount = () => {
  return {
    type: 'DecrementPageCount'
  }
}

const SetToggleData = () => {
  return {
    SetToggleData: 'SetToggleData'
  }
}

const UpdateToggles = (newToggleArray) => {
  return {
    type: 'UpdateToggles',
    newToggleArray: newToggleArray
  }
}

const AddAllergies = (newList) => {
  return {
    type: 'AddAllergies',
    newList: newList
  }
}

const RemoveAllergy = (allergy) => {
  return {
    type: 'RemoveAllergy',
    allergy: allergy
  }
}

const MouseHandler = (boolean) => {
  return {
    type: 'MouseHandler',
    boolean: boolean
  }
}

const SetPeople = (number) => {
  return {
    type: 'SetPeople',
    number: number
  }
}

const SetMeals = (number) => {
  return {
    type: 'SetMeals',
    number: number
  }
}

const updateRecipeList = (recipeListObject) => {
  return {
    type: 'Recipes',
    recipeListObject: recipeListObject
  }
}

// Updates query to reflect user's search input
const updateQuery = (query) => {
  return {
    type: 'setQuery',
    query: query
  };
};

// Updates with results from user's search
const updateSearch = (search) => {
  return {
    type: 'setSearch',
    searchResults: search
  };
};

// Updates with recipes on user's menu
const updateMenu = (menu) => {
  return {
    type: 'UPDATE',
    recipes: menu
  };
};

const updateView = (view) => {
  return {
    type: 'setView',
    view: view
  };
};

const updateServings = (count) => {
  return {
    type: 'setServings',
    servings: count
  };
};

const updateIngredients = (ingredients) => {
  return {
    type: 'setIngredients',
    ingredients: ingredients
  };
};

const logout = () => {
  return {
    type: 'Logout',
  }
}

const UpdateDiet = (selection) => {
  return {
    type: 'UpdateDiet',
    selection: selection
  };
};

const resetPage = () => {
  return {
    type: resetPage
  }
}

export { addAccountInfo, addPreferences, updateIngredients, 
  IteratePageCount, DecrementPageCount, SetToggleData, UpdateToggles, 
  AddAllergies, RemoveAllergy, MouseHandler, SetPeople, SetMeals, 
  updateRecipeList, updateQuery, updateSearch, updateMenu, updateView, 
  updateServings, UpdateDiet, logout, resetPage }
