import React, { Component }from 'react';
import { Grommet, Button, Box, RadioButton } from 'grommet';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addAccountInfo, addPreferences } from './actions';
import ToggleOptions from './ToggleOptions.jsx';
import AllergyItem from './AllergyItem.jsx';
import customTheme from './grommet/radioButton';
import NavBar from './NavBar.jsx'
import data from '../../db/dummyPreferenceData';

class Preferences extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
  }

  componentDidMount() {
    this.setData();
  }

  setData() {
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

    this.setState(() => {
      return {userPreferences1: newOptions1, userPreferences2: newOptions2}
    });
  }

  updateData(newArray) {
    let newOptions1 = this.state.userPreferences1.map(array => {
      return array.slice();
    })

    let newOptions2 = this.state.userPreferences2.map(array => {
      return array.slice();
    })

    for (let i = 0; i < newOptions1.length; i++) {
      if (newOptions1[i][0] === newArray[0]) {
        newOptions1[i][1] = newArray[1];
      } 
    }

    for (let i = 0; i < newOptions2.length; i++) {
      if (newOptions2[i][0] === newArray[0]) {
        newOptions2[i][1] = newArray[1];
      } 
    }
    
    this.setState({ userPreferences1: newOptions1, userPreferences2: newOptions2})
  }

  addAllergies(event) {
    let allergyArray = this.state.addedAllergies;


    if (event.type === 'click') {
      if (document.getElementById('preferenceAllergiesInput').value === '' || this.state.addedAllergies.indexOf(document.getElementById('preferenceAllergiesInput').value) >= 0) {
        document.getElementById('preferenceAllergiesInput').value = '';
        return;
      }
      allergyArray.push(document.getElementById('preferenceAllergiesInput').value);
      document.getElementById('preferenceAllergiesInput').value = '';

      this.setState({ addedAllergies: allergyArray });
      return;
    }
    
    if (event.key === 'Enter') { 
      this.state.addedAllergies.indexOf(event.target.value)
      if (event.target.value === '' || this.state.addedAllergies.indexOf(event.target.value) >= 0) {
        event.target.value = '';
        return;
      }
      allergyArray.push(event.target.value)
      event.target.value = '';

      this.setState({ addedAllergies: allergyArray});
    }
  }

  removeAllergy (allergy) {
    let newAllergyList = this.state.addedAllergies;
    newAllergyList.splice(newAllergyList.indexOf(allergy), 1);
    this.setState({addAllergies: newAllergyList})
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 })
  }

  saveAndContinue() {
    //put request to server
    //add state to redux
    let newState = {}
    // const dispatch = useDispatch();

    let fullArray = this.state.userPreferences1.concat(this.state.userPreferences2);

    for (let option of fullArray) {
      newState[option[0]] = option[1];
    }

    newState.addedAllergies = this.state.addedAllergies;
    newState.peopleToPrepFor = this.state.people;
    newState.isMetric = this.state.isMetric;

    // const billy = useSelector(state => preferenceState)
    // console.log(billy)
    // dispatch(addPreferences(newState))

    console.log(newState);

    //redirect on last page
    if (this.state.page === 3) {
      this.addCount();
    }
    this.setState({page: this.state.page + 1})
  }

  addCount() {
    this.setState({ people: Number(document.getElementById('preferencesCountInput').value)})
  }

  handleMetric(boolean) {
    this.setState({isMetric: boolean})
  }

  render() {

    return (
      <div id="preferencesViewContainer">
        <h1 className="preferencesHeader">Preferences</h1>
        <div className="preferenceSelectorContainer">
            { this.state.page === 0 ? this.state.userPreferences1.map((toggleArray, index) => {
              return (
                <ToggleOptions
                  updateData={this.updateData.bind(this)}
                  toggleArray={toggleArray}
                  key={index}
                />
              )
            }) : null }

          {this.state.page === 1 ? this.state.userPreferences2.map((toggleArray, index) => {
            return (
              <ToggleOptions
                updateData={this.updateData.bind(this)}
                toggleArray={toggleArray}
                key={index}
              />
            )
          }) : null}

          {this.state.page === 2 ?
          <div className="inputContainer">
            <p id="preferencesInputInstructions">Other Allergies or Restrictions:</p>
              <ul id="preferencesUl">
                {this.state.addedAllergies.map((allergy, index) => {
                  return (
                    <AllergyItem 
                      removeAllergy={this.removeAllergy.bind(this)}
                      allergy={allergy}
                      key={index}
                    />
                  )
                })}
              </ul>
              <div id="preferencesInputButtonContainer">
                <input id="preferenceAllergiesInput" onKeyUp={this.addAllergies.bind(this)} placeholder="ex: Peanuts"></input>
              <Button className="secondary_button preferenceAllergiesInputButton" onClick={(event) => this.addAllergies(event)}primary >Add</Button>
              </div>
            </div> 
            : null }

          {this.state.page === 3 ? 
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
                      checked={!this.state.isMetric} //{selected === "c2"}
                      onChange={() => this.handleMetric(false)}
                    />
                    <RadioButton
                      label="Metric"
                      name="radio"
                      value="c1"
                      checked={this.state.isMetric} //{"c1"}
                      onChange={() => this.handleMetric(true)}
                    />
                  </Box>
                </Grommet>
              </div>
            : null}

        </div>
        <div id="preferencesDetailContainer">
          <p id="preferencesDetail">{this.state.details[this.state.page]}</p>
        </div>
        <Button className="primary_button preferenceButton" onClick={() => this.saveAndContinue()} primary >{'Save & Continue'}</Button>
      <NavBar />
      </div>
    )
  }
}

export default Preferences;

