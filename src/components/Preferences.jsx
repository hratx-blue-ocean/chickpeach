import React from 'react';
import { Grommet, Button, Box, RadioButton } from 'grommet';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { IteratePageCount, AddAllergies, HandleMetric, SetPeople } from './actions';
import ToggleOptions from './ToggleOptions.jsx';
import AllergyItem from './AllergyItem.jsx';
import customTheme from './grommet/radioButton';
import NavBar from './NavBar.jsx'

const Preferences = (props) => {

  // setData() {
  //   //axios request
  //   //send to Redux
  // }
  let state = useSelector(state => state.prefAppState);
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

  const saveAndContinue =() => {

    dispatch(IteratePageCount())
    //put request to server

    if (state.page === 3) {
      dispatch(SetPeople(Number(document.getElementById('preferencesCountInput').value)));
    }
  };

    return (
      <div id="preferencesViewContainer">
        <h1 className="preferencesHeader">Preferences</h1>
        <div className="preferenceSelectorContainer">
            { state.page === 0 ? state.userPreferences1.map((toggleArray, index) => {
              return (
                <ToggleOptions
                  toggleArray={toggleArray}
                  key={index}
                />
              )
            }) : null }

          {state.page === 1 ? state.userPreferences2.map((toggleArray, index) => {
            return (
              <ToggleOptions
                toggleArray={toggleArray}
                key={index}
              />
            )
          }) : null}

          {state.page === 2 ?
          <div className="inputContainer">
            <p id="preferencesInputInstructions">Other Allergies or Restrictions:</p>
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
                <input id="preferenceAllergiesInput" onKeyUp={(event) => addAllergies(event)} placeholder="ex: Peanuts"></input>
              <Button className="secondary_button preferenceAllergiesInputButton" onClick={(event) => addAllergies(event)}primary >Add</Button>
              </div>
            </div> 
            : null }

          {state.page === 3 ? 
              <div id="preferencesCountContainer">
                <p className="preferenceDescription">How many people you are preparing for?</p>
                <input id="preferencesCountInput" placeholder="ex: 3"></input>
              <p className="preferenceDescription">Would you like quantities displayed in imperial or metric?</p>
                <Grommet theme={customTheme}>
                  <Box align="start" pad="large" gap="small">
                    <RadioButton
                      label="Imperial"
                      name="radio"
                      value="c2"
                      checked={!state.isMetric}
                      onChange={() => dispatch(HandleMetric(false))}
                    />
                    <RadioButton
                      label="Metric"
                      name="radio"
                      value="c1"
                      checked={state.isMetric}
                      onChange={() => dispatch(HandleMetric(true))}
                    />
                  </Box>
                </Grommet>
              </div>
            : null}

        </div>
        <div id="preferencesDetailContainer">
          <p id="preferencesDetail">{state.details[state.page]}</p>
        </div>
        <Button className="primary_button preferenceButton" onClick={() => saveAndContinue()} primary >{'Save & Continue'}</Button>
      <NavBar />
      </div>
    )
}

export default Preferences;