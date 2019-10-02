
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
  {
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

const HandleMetric = (boolean) => {
  return {
    type: 'HandleMetric',
    boolean: boolean
  }
}

const SetPeople = (number) => {
  return {
    type: 'SetPeople',
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

const SetMeals = (number) => {
  return {
    type: 'SetMeals',
    number: number
  }
}

export { addAccountInfo, addPreferences, IteratePageCount, DecrementPageCount, SetToggleData, UpdateToggles, AddAllergies, RemoveAllergy, MouseHandler, HandleMetric, SetPeople, SetMeals, updateRecipeList, updateQuery, updateSearch }