import React from 'react';
import { CheckBox, Grommet } from 'grommet';
import { grommet } from "grommet/themes";
import { deepMerge } from "grommet/utils";
import { css } from "styled-components";
import { Button } from "grommet";
import NavBar from './NavBar.jsx'
import data from '../../db/dummyPreferenceData';
import { withRouter } from 'react-router-dom';

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


class Preferences extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userPreferences: [],
      details: ['Do you have any dietary restrictions or allergies?', ''],
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
      ['keto', data.keto],
      ['vegan', data.vegan]
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
    
    console.log(event.key);
    if (event.key === 'Enter') { //or button press
      allergyArray.push(event.target.value)
      event.target.value = '';

      this.setState({ addedAllergies: allergyArray});
    }

  }

  render() {

    return (
      <div id="preferencesViewContainer">
        <h1 className="preferencesHeader">Preferences</h1>
        <div className="preferenceSelectorContainer">
            {this.state.userPreferences.map((toggleArray, index) => {
              return (
                <Option 
                  updateData={this.updateData.bind(this)}
                  toggleArray={toggleArray}
                  key={index}
                />
              )
            })}
          <div className="inputContainer">
            <p id="preferencesInputInstructions">Other Allergies or Restrictions:</p>
            <input id="preferenceAllergiesInput" onKeyUp={this.addAllergies.bind(this)} placeholder="ex: Peanuts, fish, dairy, etc..."></input>
          </div>
        </div>
        <Button className="primary_button preferenceButton" primary >Remove from menu</Button>
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
    vegan: 'Vegan'
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


export default Preferences;

