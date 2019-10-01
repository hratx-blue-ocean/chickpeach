import React, { Component }from 'react';
import { CheckBox, Grommet, Button } from 'grommet';
import { grommet } from "grommet/themes";
import { deepMerge } from "grommet/utils";
import { css } from "styled-components";
import NavBar from './NavBar.jsx'
import data from '../../db/dummyPreferenceData';
import { withRouter } from 'react-router-dom';
import MaterialIcon from 'material-icons-react';

/*///////////////////////////////////////////////////////////////////////////
//////////////     GROMMET TOGGLE ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////*/

const checkboxCheckStyle = css`
  background-color: #FBDCA1;
  border-color: #FBDCA1;
`;

const customToggleTheme = {
  global: {
    colors: {
      "focus": undefined,
      "toggle-bg": "#CCCCCC",
      "toggle-knob": "white",
      "toggle-accent": "#CCCCCC"
    }
  },
  checkBox: {
    border: {
      color: {
        light: "toggle-bg"
      }
    },
    color: {
      light: "toggle-knob"
    },
    check: {
      radius: "2px"
    },
    hover: {
      border: {
        color: undefined
      }
    },
    toggle: {
      background: { light: "toggle-accent" },
      color: {
        light: "toggle-knob"
      },
      size: "35px",
      knob: {
        extend: `
          top: 0px;
          box-shadow: 0px 0px 2px 0px rgba(66,66,66,1),
           0px 2px 2px 0px rgba(66,66,66,1);
        `
      },
      extend: ({ checked }) => `
        height: 22px;
        ${checked && checkboxCheckStyle}
      `
    },
    gap: "xsmall",
    size: "18px"
  }
};

/*///////////////////////////////////////////////////////////////////////////
////////////    APP STARTS     //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////*/


class Preferences extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userPreferences: [],
      details: [
        'Do you have any of the following dietary restrictions?', 
        'Do you have any additional dietary restrictions or allergies?', 
        'How many people you are preparing for?', 
        'Would you like quantities displayed in imperial or metric?'
      ],
      page: 0,
      addedAllergies: []
    };
  }

  componentDidMount() {
    this.setData();
  }

  setData() {
    let newOptions = [
      ['vegetarian', data.vegetarian],
      ['glutenFree', data.glutenFree],
      ['vegan', data.vegan],
      ['dairyFree', data.dairyFree],
      ['keto', data.keto],
      ['whole30', data.whole30]
    ];

    this.setState(() => {
      return {userPreferences: newOptions}
    });
  }

  updateData(newArray) {
    let newOptions = this.state.userPreferences.map(array => {
      return array.slice();
    })

    for (let i = 0; i < newOptions.length; i++) {
      if (newOptions[i][0] === newArray[0]) {
        newOptions[i][1] = newArray[1];
      }
    }
    
    this.setState({ userPreferences: newOptions})
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
    console.log('saved yo!')
    //put request to server
    //add state to redux

    //redirect on last page
    this.setState({page: this.state.page + 1})
  }

  render() {

    return (
      <div id="preferencesViewContainer">
        <h1 className="preferencesHeader">Preferences</h1>
        <div className="preferenceSelectorContainer">
            { this.state.page === 0 ? this.state.userPreferences.map((toggleArray, index) => {
              return (
                <Option 
                  updateData={this.updateData.bind(this)}
                  toggleArray={toggleArray}
                  key={index}
                />
              )
            }) : null }

          {this.state.page === 1 ?
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

          {this.state.page === 2 ? 
            <div>
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

const Option = (props) => {
  let babel = {
    vegetarian: 'Vegetarian',
    glutenFree: 'Gluten Free',
    keto: 'Keto',
    vegan: 'Vegan',
    dairyFree: 'Dairy Free',
    whole30: 'Whole 30'
  }

  return (
    <div className="preferenceOptions">
      <Grommet theme={deepMerge(grommet, customToggleTheme)}>
        <CheckBox
          checked={props.toggleArray[1]}
          label={babel[props.toggleArray[0]]}
          toggle={true}
          onChange={() => {
            props.updateData([props.toggleArray[0], !props.toggleArray[1]]);
          }}
        />
      </Grommet>
    </div>
  )
}

class AllergyItem extends Preferences {
  constructor (props) {
    super (props) 
    this.state = {
      onHover: false
    }
  }

  mouseHandler(boolean) {
    console.log(boolean)
    this.setState({onHover: boolean});
  }

  render () {
    return (
      <div className="AllergyCancelContainer"> 
        <li className="preferencesAllergyItem" 
          onMouseEnter={() => this.mouseHandler(true)} onMouseLeave={() => this.mouseHandler(false)} 
          style={{ cursor: "pointer", color: (this.state.onHover ? "#FFB084" : "#444444")}}>{this.props.allergy}</li>
        <div className="preferenceIconContainer" style={{cursor: "pointer"}}
          onMouseEnter={() => this.mouseHandler(true)} onMouseLeave={() => this.mouseHandler(false)}
          onClick={() => this.props.removeAllergy(this.props.allergy)}>
          {this.state.onHover ? <div><MaterialIcon icon="cancel" color="#FFB084" size={18} /></div> : <div> <MaterialIcon icon="cancel" color="#EBEDEF" size={18} /> </div>}
        </div>
      </div>
    )
  }
}

export default Preferences;

