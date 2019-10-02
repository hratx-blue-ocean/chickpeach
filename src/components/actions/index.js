
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
  {
    type: 'SetToggleData'
  }
}

const UpdateToggles = () => {
  {
    type: 'UpdateToggles'
  }
}

const AddAllergies = () => {
  {
    type: 'AddAllergies'
  }
}

const RemoveAllergy = () => {
  {
    type: 'RemoveAllergy'
  }
}

export { addAccountInfo, addPreferences, IteratePageCount, DecrementPageCount, SetToggleData, UpdateToggles, AddAllergies, RemoveAllergy }
