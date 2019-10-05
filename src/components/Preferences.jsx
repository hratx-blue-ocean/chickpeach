import React, { useState } from 'react';
import { Grommet, Button, FormField, TextInput, RadioButtonGroup } from 'grommet';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { IteratePageCount, AddAllergies, HandleMetric, SetPeople, SetMeals, addPreferences, UpdateDiet, DecrementPageCount } from './actions';
import ToggleOptions from './ToggleOptions.jsx';
import AllergyItem from './AllergyItem.jsx';
import customTheme from './grommet/radioButton';
import NavBar from './NavBar.jsx'

const Preferences = (props) => {
  const [amountOfPeople, setPeople] = useState('');
  const [amountOfMeals, setMeals] = useState('');
  const [allergiesInput, setAllergiesInput ] = useState('');
  let state = useSelector(state => state.prefAppState);
  let userState = useSelector(state => state.Preferences);
  let dispatch = useDispatch();

  const addAllergies = () => {
    let allergyArray = state.addedAllergies;

    if (allergiesInput === '' || state.addedAllergies.indexOf(allergiesInput) >= 0) {
      return;
    }
    allergyArray.push(allergiesInput);
    setAllergiesInput('')

    dispatch(AddAllergies(allergyArray));
    return;
  };

  const saveToDatabase = (amountOfPeople = state.people, amountOfMeals = state.numberOfMeals) => {
    let newState = {};

    for (let array of state.userPreferences1) {
      newState[array[0]] = array[1]
    }

    for (let array of state.userPreferences2) {
      newState[array[0]] = array[1]
    }

    let preferencesObject = {
      user_id: userState.uid,
      diet: state.diet,
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
      gluten: newState.gluten,
      dairy: newState.dairy,
      peopleToPrepFor: amountOfPeople,
      numberOfMeals: amountOfMeals,
      addedAllergies: state.addedAllergies
    };
    
    //***Change to Post***
    axios.get('/adjustpreferences', {
      params: preferencesObject
    })
      .then(response => {
        console.log('sumbitted preferences');
      })
      .catch(error => {
        console.log(error);
      })
    
    //**Change to Post
    axios.get('/bannedingredients', {
      params: {
        user_id: preferencesObject.user_id,
        arrayOfAllergies: preferencesObject.addAllergies
      }
    })
      .then(response => {
        console.log('sumbitted allergies');
      })
      .catch(error => {
        console.log(error);
      })


    dispatch(addPreferences(preferencesObject))
  };

  const saveAndContinue = () => {
    if (state.page === 4) {
       dispatch(SetPeople(amountOfPeople));
      dispatch(SetMeals(amountOfMeals));
      saveToDatabase(amountOfPeople, amountOfMeals);
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
      whole30: 'Whole30',
      paleo: 'Paleo',
      pescetarian: 'Pescetarian' 
    };

    if (state.diet === '') {
      return 'I eat it all!';
    }

    return showName[state.diet];
  };

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
              options={['Vegan', 'Vegetarian', 'Keto', 'Whole30', 'Paleo', 'Pescetarian',  'I eat it all!']}
                value={getValue()}
                onChange={(event) => dispatch(UpdateDiet(event.target.value))}
              />
            </Grommet>
            </div>
          }

          { state.page === 1 && 
          <div>
            <p id="preferencesInputInstructions">Toggle Right to Remove Ingredient from Search Results:</p>
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
            <p id="preferencesInputInstructions">Toggle Right to Remove Ingredient from Search Results:</p>
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
            <div id="preferencesInputButtonContainer">
              <Grommet>
                <FormField name="email">
                  <TextInput id="preferenceAllergiesInput" placeholder="ex: Bananas" value={allergiesInput} onKeyDown={(e) => e.key === 'Enter' && addAllergies()} onChange={(e) => setAllergiesInput(e.target.value)} />
                </FormField>
              </Grommet>
              <Button className="secondary_button preferenceAllergiesInputButton" onClick={(event) => addAllergies(event)}primary >Add</Button>
            </div> 
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
          </div>}

        {state.page === 4 && 
          <div id="preferenceMeasurementsContainer">
            <div className="preferenceInputDescriptionContainer">
              <p className="preferenceDescription">How many people you are preparing for?</p>
              <Grommet>
                <FormField name="email">
                  <TextInput id="preferencesCountInput" placeholder="ex: 3" value={amountOfPeople} onChange={(e) => setPeople(+e.target.value)} />
                </FormField>
              </Grommet>
            </div>
            <div className="preferenceInputDescriptionContainer">
              <p className="preferenceDescription">How many meals per week is each person preparing for?</p>
              <Grommet>
                <FormField name="password">
                    <TextInput id="preferencesMealCountInput" placeholder="ex: 18" value={amountOfMeals} onChange={(e) => setMeals(+e.target.value)} />
                </FormField>
              </Grommet>
            </div>
          </div>}
        </div>

        {state.page === 0 ?
        <div className="preferencesLonelyButtonFooter">
          <div id="preferencesNextPageTextContainer">
            <p id="preferencesNextPage"><b>{'Next: '}</b>{state.nextPage[state.page]}</p>
          </div>
          <div id="preferencesLonelyFooterButtonContainer">
            <Button className="primary_button preferenceButton" onClick={() => saveAndContinue()} primary>{'Save & Continue'}</Button>
          </div>
        </div> 
        : 
        state.page === 4 ?
          <div className="preferencesFooter">
            <div id="preferencesNextPageTextContainer">
              <p id="preferencesNextPage"><b>{'Next: '}</b>{state.nextPage[state.page]}</p>
            </div>
            <div id="preferencesFooterButtonContainer">
              <Button className="secondary_button preferenceButton" onClick={() => dispatch(DecrementPageCount())} primary>{'Previous'}</Button>
              <Button className="primary_button preferenceLastButton" onClick={() => saveAndContinue()} primary>{'Save'}</Button>
            </div>
            </div>
        :
        <div className="preferencesFooter">
          <div id="preferencesNextPageTextContainer">
              <p id="preferencesNextPage"><b>{'Next: '}</b>{state.nextPage[state.page]}</p>
          </div>
          <div id="preferencesFooterButtonContainer">
            <Button className="secondary_button preferenceButton" onClick={() => dispatch(DecrementPageCount())} primary>{'Previous'}</Button>
            <Button className="primary_button preferenceButton" onClick={() => saveAndContinue()} primary>{'Save & Continue'}</Button>
          </div> 
      </div>}

    <NavBar />
    </div>
  )
}

export default withRouter(Preferences);