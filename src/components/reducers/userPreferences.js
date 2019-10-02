const defaultState = {
  uid: 'default',
  displayName: 'default',
  email: 'default@default.com',
  vegetarian: false,
  glutenFree: false,
  dairyFree: false,
  keto: false,
  whole30: false,
  peopleToPrepFor: 1,
  addedAllergies: [],
  isMetric: false
}

const preferenceState = (state = defaultState, action) => {
  if(action.type === 'AddAccountInfo'){
    let newState = {};
    newState.uid = action.uid;
    newState.displayName = action.displayName;
    newState.email = action.email;
    newState.vegetarian = state.vegetarian;
    newState.glutenFree = state.glutenFree;
    newState.dairyFree = state.dairyFree;
    newState.keto = state.keto;
    newState.whole30 = state.whole30;
    newState.peopleToPrepFor = state.peopleToPrepFor;
    newState.addedAllergies = state.addedAllergies;
    newState.isMetric = state.isMetric;
    return newState;
  }

  if(action.type === 'Preferences') {
    console.log('hellomoto')
  }

  return state;
}

export default preferenceState;