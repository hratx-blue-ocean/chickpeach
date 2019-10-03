import data from '../../../db/dummyPreferenceData.js';





const defaultState = {
  diet: [
    ['vegetarian', false],
    ['vegan', false],
    ['keto', false],
    ['whole30', false]
  ],
  userPreferences1: [
    ['glutenFree', false],
    ['dairyFree', false],
    ['egg', false],
    ['grain', false]
  ],
  
  userPreferences2: [
    ['peanut', false],
    ['seafood', false],
    ['sesame', false],
    ['shellfish', false],
    ['soy', false],
    ['sulfite', false],
    ['treeNut', false],
    ['wheat', false]
  ],
    details: [
      'Do you have a preferred diet?',
      'Do you have any of the following dietary restrictions or allergies?',
      'Do you have any additional dietary restrictions or allergies?',
      ''
    ],
    page: 0,
    addedAllergies: [],
    people: 1,
    isMetric: false,
    onHover: false,
    numberOfMeals: 0
};

const AppStateReducer = (state = defaultState, action) => {
  if (action.type === 'UpdateToggles') {
    let newState = {
      diet: state.diet,
      details: state.details,
      page: state.page,
      addedAllergies: state.addedAllergies,
      people: state.people,
      isMetric: state.isMetric,
      onHover: false,
      numberOfMeals: 0
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

  if (action.type === 'UpdateDiet') {
    let newState = {
      userPreferences1: state.userPreferences1,
      userPreferences2: state.userPreferences2,
      details: state.details,
      page: state.page,
      addedAllergies: state.addedAllergies,
      people: state.people,
      isMetric: state.isMetric,
      onHover: false,
      numberOfMeals: 0
    };

    const showName = {
      Vegetarian: 'vegetarian',
      Vegan: 'vegan',
      Keto: 'keto',
      'Whole 30': 'whole30'
    };

    let newDiet = state.diet.map(array => {
      return array.slice();
    })

    for (let i = 0; i < newDiet.length; i++) {
      if (newDiet[i][0] === showName[action.selection]) {
        newDiet[i][1] = true
      } else {
        newDiet[i][1] = false;
      }
    }

    newState.diet = newDiet;
    
    return newState;
  }

  if (action.type === 'IteratePageCount') {
    let newState = {
      diet: state.diet,
      userPreferences1: state.userPreferences1,
      userPreferences2: state.userPreferences2,
      details: state.details,
      page: state.page + 1,
      addedAllergies: state.addedAllergies,
      people: state.people,  //peopleToPrepFor
      isMetric: state.isMetric,
      onHover: false,
      numberOfMeals: 0
    };

    return newState;
  }

  if (action.type === 'RemoveAllergy') {
    let newState = {
      diet: state.diet,
      userPreferences1: state.userPreferences1,
      userPreferences2: state.userPreferences2,
      details: state.details,
      page: state.page,
      people: state.people,
      isMetric: state.isMetric,
      onHover: false,
      numberOfMeals: 0
    };

    let newAllergyList = state.addedAllergies;
    newAllergyList.splice(newAllergyList.indexOf(action.allergy), 1);

    newState.addedAllergies = newAllergyList

    return newState;
  }

  if (action.type === 'MouseHandler') {
    let newState = {
      diet: state.diet,
      userPreferences1: state.userPreferences1,
      userPreferences2: state.userPreferences2,
      details: state.details,
      addedAllergies: state.addedAllergies,
      page: state.page,
      people: state.people,
      isMetric: state.isMetric,
      numberOfMeals: 0
    };

    newState.onHover = action.boolean;

    return newState;
  }

  
  if (action.type === 'AddAllergies') {
    let newState = {
      diet: state.diet,
      userPreferences1: state.userPreferences1,
      userPreferences2: state.userPreferences2,
      details: state.details,
      addedAllergies: action.newList,
      page: state.page,
      people: state.people, 
      isMetric: state.isMetric,
      onHover: false,
      numberOfMeals: 0
    };

    return newState;
  }

  if (action.type === 'HandleMetric') {
    let newState = {
      diet: state.diet,
      userPreferences1: state.userPreferences1,
      userPreferences2: state.userPreferences2,
      details: state.details,
      addedAllergies: state.addedAllergies,
      page: state.page,
      people: state.people,
      isMetric: action.boolean,
      onHover: false,
      numberOfMeals: 0
    };

    return newState;
  }

  if (action.type === 'SetPeople') {
    let newState = {
      diet: state.diet,
      userPreferences1: state.userPreferences1,
      userPreferences2: state.userPreferences2,
      details: state.details,
      addedAllergies: state.addedAllergies,
      page: state.page,
      people: action.number,
      isMetric: state.isMetric,
      onHover: false,
      numberOfMeals: 0
    };

    return newState;
  }

  if (action.type === 'SetMeals') {
    let newState = {
      diet: state.diet,
      userPreferences1: state.userPreferences1,
      userPreferences2: state.userPreferences2,
      details: state.details,
      addedAllergies: state.addedAllergies,
      page: state.page,
      people: state.people,
      isMetric: state.isMetric,
      onHover: false,
      numberOfMeals: action.number
    };

    return newState;
  }

  if (action.type === 'Preferences') {
    let preferences = action.preferencesObject;

    let newDiet = [
      ['vegetarian', preferences.vegetarian],
      ['vegan', preferences.vegan],
      ['keto', preferences.keto],
      ['whole30', preferences.whole30]
    ];

    let newOptions1 = [
      ['glutenFree', preferences.glutenFree],
      ['dairyFree', preferences.dairyFree],
      ['egg', preferences.egg],
      ['grain', preferences.grain]
    ];

    let newOptions2 = [
      ['peanut', preferences.peanut],
      ['seafood', preferences.seafood],
      ['sesame', preferences.sesame],
      ['shellfish', preferences.shellfish],
      ['soy', preferences.soy],
      ['sulfite', preferences.sulfite],
      ['treeNut', preferences.treeNut],
      ['wheat', preferences.wheat]
    ];

    let newState = {
      diet: newDiet,
      userPreferences1: newOptions1,
      userPreferences2: newOptions2,
      details: state.details,
      page: state.page,
      addedAllergies: state.addedAllergies,
      people: state.people,
      isMetric: state.isMetric,
      onHover: false,
      numberOfMeals: 0
    };
    return newState;
  }

  return state;
}

export default AppStateReducer;