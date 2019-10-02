import data from '../../../db/dummyPreferenceData.js';

const defaultState = {
    userPreferences1: [],
    userPreferences2: [],
    details: [
      'Do you have any of the following dietary restrictions or allergies?',
      'Do you have any of the following dietary restrictions or allergies?',
      'Do you have any additional dietary restrictions or allergies?',
      ''
    ],
    page: 0,
    addedAllergies: [],
    people: 1,  //peopleToPrepFor
    isMetric: false
};

const AppStateReducer = (state = defaultState, action) => {
  if (action.type === 'AddAccountInfo') {
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

  if (action.type === 'Preferences') {
    console.log('hellomoto')
  }
  
  let newOptions1 = [
    ['vegetarian', data.vegetarian],
    ['glutenFree', data.glutenFree],
    ['vegan', data.vegan],
    ['dairyFree', data.dairyFree],
    ['keto', data.keto],
    ['whole30', data.whole30],
    ['egg', data.egg],
    ['grain', data.grain]
  ];

  let newOptions2 = [
    ['peanut', data.peanut],
    ['seafood', data.seafood],
    ['sesame', data.sesame],
    ['shellfish', data.shellfish],
    ['soy', data.soy],
    ['sulfite', data.sulfite],
    ['treeNut', data.treeNut],
    ['wheat', data.wheat]
  ];

  let newState = {
    userPreferences1: newOptions1,
    userPreferences2: newOptions2,
    details: state.details,
    page: state.page,
    addedAllergies: state.addedAllergies,
    people: state.people,  //peopleToPrepFor
    isMetric: state.isMetric
  };
  
  return newState;
}

export default AppStateReducer;