
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

export { addAccountInfo, addPreferences }