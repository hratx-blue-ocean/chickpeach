const defaultState = {
  diet: '',
  uid: 'default',
  displayName: 'default',
  email: 'default@default.com',
  gluten: false,
  dairy: true,
  egg: false,
  grain: false,
  peanut: false,
  seafood: false,
  sesame: true,
  shellfish: false,
  soy: true,
  sulfite: false,
  treeNut: false,
  wheat: true,
  peopleToPrepFor: 0,
  addedAllergies: [],
  numberOfMeals: 0
}

const preferenceState = (state = defaultState, action) => {
  if(action.type === 'AddAccountInfo'){
    let newState = {
      diet: state.diet,
      uid: action.uid,
      displayName: action.displayName,
      email: action.email,
      gluten: state.gluten,
      dairy: state.dairy,
      egg: state.egg,
      grain: state.grain,
      peanut: state.peanut,
      seafood: state.seafood,
      sesame: state.sesame,
      shellfish: state.shellfish,
      soy: state.soy,
      sulfite: state.sulfite,
      treeNut: state.treeNut,
      wheat: state.wheat,
      peopleToPrepFor: state.peopleToPrepFor,
      addedAllergies: state.addedAllergies,
      numberOfMeals: state.numberOfMeals
    };

    return newState;
  }

  if(action.type === 'Preferences') {
    let preferences = action.preferencesObject;

    let newState = {
      diet: preferences.diet,
      uid: state.uid,
      displayName: state.displayName,
      email: state.email,
      gluten: preferences.gluten,
      dairy: preferences.dairy,
      egg: preferences.egg,
      grain: preferences.grain,
      peanut: preferences.peanut,
      seafood: preferences.seafood,
      sesame: preferences.sesame,
      shellfish: preferences.shellfish,
      soy: preferences.soy,
      sulfite: preferences.sulfite,
      treeNut: preferences.treeNut,
      wheat: preferences.wheat,
      peopleToPrepFor: preferences.peopleToPrepFor,
      addedAllergies: preferences.addedAllergies,
      numberOfMeals: preferences.numberOfMeals
    };

    return newState;
  }

  if(action.type === 'Logout') {
    return defaultState;
  }

  return state;
}

export default preferenceState;