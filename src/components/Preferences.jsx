import React from 'react';
import { Grommet, Button, Box, RadioButton, RadioButtonGroup } from 'grommet';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { IteratePageCount, AddAllergies, HandleMetric, SetPeople, SetMeals, addPreferences, UpdateDiet, DecrementPageCount } from './actions';
import ToggleOptions from './ToggleOptions.jsx';
import AllergyItem from './AllergyItem.jsx';
import customTheme from './grommet/radioButton';
import NavBar from './NavBar.jsx'

const Preferences = (props) => {
  let state = useSelector(state => state.prefAppState);
  let userState = useSelector(state => state.Preferences);
  let dispatch = useDispatch();

  const addAllergies = (event) => {
    let allergyArray = state.addedAllergies;

    if (event.type === 'click') {
      if (document.getElementById('preferenceAllergiesInput').value === '' || state.addedAllergies.indexOf(document.getElementById('preferenceAllergiesInput').value) >= 0) {
        document.getElementById('preferenceAllergiesInput').value = '';
        return;
      }
      allergyArray.push(document.getElementById('preferenceAllergiesInput').value);
      document.getElementById('preferenceAllergiesInput').value = '';

      dispatch(AddAllergies(allergyArray))
      return;
    }
    
    if (event.key === 'Enter') { 
      state.addedAllergies.indexOf(event.target.value)
      if (event.target.value === '' || state.addedAllergies.indexOf(event.target.value) >= 0) {
        event.target.value = '';
        return;
      }
      allergyArray.push(event.target.value)
      event.target.value = '';
      dispatch(AddAllergies(allergyArray))
    }
  }

  // previousPage() {
  //   this.setState({ page: this.state.page - 1 })
  // }

  const saveToDatabase = () => {
    let newState = {};

    for (let array of state.diet) {
      newState[array[0]] = array[1]
    }

    for (let array of state.userPreferences1) {
      newState[array[0]] = array[1]
    }

    for (let array of state.userPreferences2) {
      newState[array[0]] = array[1]
    }

    let preferencesObject = {
      user_id: userState.uid,
      egg: newState.egg,
      grain: newState.grain,
      peanut: newState.peanut,
      seafood: newState.seafood,
      shellfish: newState.shellfish,
      sesame: newState.sesame,
      soy: newState.soy,
      sulfite: newState.sulfite,
      treeNut: newState.treeNut,
      wheat: newState.wheat,
      vegetarian: newState.vegetarian,
      vegan: newState.vegan,
      glutenFree: newState.glutenFree,
      dairyFree: newState.dairyFree,
      keto: newState.keto,
      whole30: newState.whole30,
      isMetric: state.isMetric,
      peopleToPrepFor: state.people,
      numberOfMeals: state.numberOfMeals,
      addedAllergies: state.addedAllergies
    };

    //***Change to Post***
    axios.get('/adjustpreferences', {
      params: preferencesObject
    })
      .then(response => {
        console.log('sumbitted');
      })
      .catch(error => {
        console.log(error);
      })
    dispatch(addPreferences(preferencesObject))
  }

  const saveAndContinue = () => {
    if (state.page === 4) {
      dispatch(SetPeople(Number(document.getElementById('preferencesCountInput').value)));
      dispatch(SetMeals(Number(document.getElementById('preferencesMealCountInput').value)));
      saveToDatabase();
      return props.history.replace('/menu');
    }
    dispatch(IteratePageCount())

    saveToDatabase()
  };

  const getValue = () => {
    const showName = {
      vegetarian: 'Vegetarian',
      vegan: 'Vegan',
      keto: 'Keto',
      whole30: 'Whole 30'
    };

    let newDiet = state.diet.map(array => {
      return array.slice();
    })

    for (let arrayPair of newDiet) {
      if (arrayPair[1]) {
        return showName[arrayPair[0]];
      }
    }

    return 'I eat it all!';
  }

  return (
    <div id="preferencesViewContainer">
      <h1 className="preferencesHeader">Preferences</h1>
        <div id="preferencesDetailContainer">
          <p id="preferencesDetail">{state.details[state.page]}</p>
        </div>
        <div className="preferenceSelectorContainer">
          {state.page === 0 && 
          <div id="preferenceDietContainer">
          <Grommet theme={customTheme}>
              <RadioButtonGroup
                name="diet"
            options={['Vegan', 'Vegetarian', 'Keto', 'Whole 30', 'I eat it all!']}
                value={getValue()}
                onChange={(event) => dispatch(UpdateDiet(event.target.value))}
              />
            </Grommet>
            </div>
          }

          { state.page === 1 && 
          <div>
            {/* <p id="preferencesInputInstructions">Toggle Right to Remove Ingredient from Search Results:</p> */}
            {state.userPreferences1.map((toggleArray, index) => {
              return (
                <ToggleOptions
                  toggleArray={toggleArray}
                  key={index}
                />
              )
            })}
          </div>}

        {state.page === 2 && 
          <div>
            {/* <p id="preferencesInputInstructions">Toggle Right to Remove Ingredient from Search Results:</p> */}
            {state.userPreferences2.map((toggleArray, index) => {
              return (
                <ToggleOptions
                  toggleArray={toggleArray}
                  key={index}
                />
              )
            })}
          </div>}

        {state.page === 3 &&
        <div className="inputContainer">
          {/* <p id="preferencesInputInstructions">Other Allergies or Restrictions:</p> */}
            <ul id="preferencesUl">
              {state.addedAllergies.map((allergy, index) => {
                return (
                  <AllergyItem 
                    allergy={allergy}
                    key={index}
                  />
                )
              })}
            </ul>
            <div id="preferencesInputButtonContainer">
              <input id="preferenceAllergiesInput" onKeyUp={(event) => addAllergies(event)} placeholder="ex: Bananas"></input>
            <Button className="secondary_button preferenceAllergiesInputButton" onClick={(event) => addAllergies(event)}primary >Add</Button>
            </div>
          </div> }

        {state.page === 4 && 
          <div id="preferenceMeasurementsContainer">
              <p className="preferenceDescription">How many people you are preparing for?</p>
              <input id="preferencesCountInput" placeholder="ex: 3"></input>
              <p className="preferenceDescription">Would you like quantities displayed in imperial or metric?</p>
              <Grommet theme={customTheme}>
                <RadioButtonGroup
                  name="measurements"
                  options={['Imperial', 'Metric']}
                  value={state.isMetric ? 'Metric': 'Imperial'}
                  onChange={(event) => event.target.value === 'Metric' ? dispatch(HandleMetric(true)) : dispatch(HandleMetric(false))}
                />
              </Grommet>
              <p className="preferenceDescription">How many meals per week are you preparing for?</p>
              <input id="preferencesMealCountInput" placeholder="ex: 18"></input>
            </div>}
          </div>
      {/* <Button className="primary_button preferenceButton" onClick={() => saveAndContinue()} primary >{'Save & Continue'}</Button> */}
      
        {state.page === 0 ?
        <div className="preferencesLonelyButtonFooter">
        <Button className="primary_button preferenceButton" onClick={() => saveAndContinue()} primary>{'Save & Continue'}</Button>
        </div> : state.page === 4 ?
          <div className="preferencesFooter">
          <Button className="secondary_button preferenceButton" onClick={() => dispatch(DecrementPageCount())} primary>{'Previous'}</Button>
          <Button className="primary_button preferenceLastButton" onClick={() => saveAndContinue()} primary>{'Save'}</Button>
        </div> :
        <div className="preferencesFooter">
        <Button className="secondary_button preferenceButton" onClick={() => dispatch(DecrementPageCount())} primary>{'Previous'}</Button>
        <Button className="primary_button preferenceButton" onClick={() => saveAndContinue()} primary>{'Save & Continue'}</Button>
      </div>}

    <NavBar />
    </div>
  )
}

export default withRouter(Preferences);