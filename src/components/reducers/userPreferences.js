const defaultState = {
  uid: 'default',
  displayName: 'default',
  email: 'default@default.com',
  vegetarian: true,
  glutenFree: false,
  keto: true,
  vegan: false,
  dairyFree: true,
  whole30: true,
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
  peopleToPrepFor: 1,
  addedAllergies: [],
  isMetric: false,
  numberOfMeals: 0
}

const preferenceState = (state = defaultState, action) => {
  if(action.type === 'AddAccountInfo'){
    let newState = {
      uid: action.uid,
      displayName: action.displayName,
      email: action.email,
      vegetarian: state.vegetarian,
      glutenFree: state.glutenFree,
      keto: state.keto,
      vegan: state.type,
      dairyFree: state.dairyFree,
      whole30: state.whole30,
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
      isMetric: state.isMetric,
      numberOfMeals: state.numberOfMeals
    };

    return newState;
  }

  if(action.type === 'Preferences') {
    let preferences = action.preferencesObject;

    let newState = {
      uid: state.uid,
      displayName: state.displayName,
      email: state.email,
      vegetarian: preferences.vegetarian,
      glutenFree: preferences.glutenFree,
      keto: preferences.keto,
      vegan: preferences.vegan,
      dairyFree: preferences.dairyFree,
      whole30: preferences.wholeThirty,
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
      peopleToPrepFor: preferences.numPeople,
      addedAllergies: preferences.addedAllergies,
      isMetric: preferences.metric,
      numberOfMeals: preferences.numMeals
    };

    console.log('reduce', newState)
    return newState;
  }

  return state;
}

export default preferenceState;