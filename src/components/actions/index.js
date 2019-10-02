
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
    type: 'IteratePageCount'
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

export { addAccountInfo, addPreferences, IteratePageCount, DecrementPageCount, SetToggleData, UpdateToggles, AddAllergies, RemoveAllergy, MouseHandler, HandleMetric, SetPeople }
