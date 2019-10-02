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
    isMetric: false,
    onHover: false
};

const AppStateReducer = (state = defaultState, action) => {
  if (action.type === 'UpdateToggles') {
    let newState = {
      details: state.details,
      page: state.page,
      addedAllergies: state.addedAllergies,
      people: state.people,  //peopleToPrepFor
      isMetric: state.isMetric,
      onHover: false
    };

    let newOptions1 = state.userPreferences1.map(array => {
      return array.slice();
    })

    let newOptions2 = state.userPreferences2.map(array => {
      return array.slice();
    })

    for (let i = 0; i < newOptions1.length; i++) {
      if (newOptions1[i][0] === action.newToggleArray[0]) {
        newOptions1[i][1] = action.newToggleArray[1];
      }
    }

    for (let i = 0; i < newOptions2.length; i++) {
      if (newOptions2[i][0] === action.newToggleArray[0]) {
        newOptions2[i][1] = action.newToggleArray[1];
      }
    }
    newState.userPreferences1 = newOptions1;
    newState.userPreferences2 = newOptions2;

    return newState;
  }

  if (action.type === 'IteratePageCount') {
    let newState = {
      userPreferences1: state.userPreferences1,
      userPreferences2: state.userPreferences2,
      details: state.details,
      page: state.page + 1,
      addedAllergies: state.addedAllergies,
      people: state.people,  //peopleToPrepFor
      isMetric: state.isMetric,
      onHover: false
    };

    return newState;
  }

  if (action.type === 'RemoveAllergy') {
    let newState = {
      userPreferences1: state.userPreferences1,
      userPreferences2: state.userPreferences2,
      details: state.details,
      page: state.page,
      people: state.people,
      isMetric: state.isMetric,
      onHover: false
    };

    let newAllergyList = state.addedAllergies;
    newAllergyList.splice(newAllergyList.indexOf(action.allergy), 1);

    newState.addedAllergies = newAllergyList

    return newState;
  }

  if (action.type === 'MouseHandler') {
    let newState = {
      userPreferences1: state.userPreferences1,
      userPreferences2: state.userPreferences2,
      details: state.details,
      addedAllergies: state.addedAllergies,
      page: state.page,
      people: state.people,
      isMetric: state.isMetric
    };

    newState.onHover = action.boolean;

    return newState;
  }

  
  if (action.type === 'AddAllergies') {
    let newState = {
      userPreferences1: state.userPreferences1,
      userPreferences2: state.userPreferences2,
      details: state.details,
      addedAllergies: action.newList,
      page: state.page,
      people: state.people, 
      isMetric: state.isMetric,
      onHover: false
    };

    return newState;
  }

  if (action.type === 'HandleMetric') {
    let newState = {
      userPreferences1: state.userPreferences1,
      userPreferences2: state.userPreferences2,
      details: state.details,
      addedAllergies: state.addedAllergies,
      page: state.page,
      people: state.people,
      isMetric: action.boolean,
      onHover: false
    };

    return newState;
  }

  if (action.type === 'SetPeople') {
    let newState = {
      userPreferences1: state.userPreferences1,
      userPreferences2: state.userPreferences2,
      details: state.details,
      addedAllergies: state.addedAllergies,
      page: state.page,
      people: action.number,
      isMetric: state.isMetric,
      onHover: false
    };

    return newState;
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
    people: state.people,
    isMetric: state.isMetric,
    onHover: false
  };
  
  return newState;
}

export default AppStateReducer;