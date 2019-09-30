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
      userPreferences: {
        vegetarian: false,
        glutenFree: false,
        keto: false,
        vegan: false,
        details: ['Do you have any dietary restrictions or allergies?', ]
      }
    };
  }

  componentDidMount() {
    this.setData();
  }

  setData() {
    this.setState(() => {
      return {userPreferences: data}
    });
  }

  render() {

    return (
      <div>
        <h1 className="header1">Preferences</h1>
        <div className="selectorContainer">
            <div className="preferenceOptions">
              <Grommet theme={deepMerge(grommet, customToggleTheme)}>
                <CheckBox
                  checked={this.state.userPreferences.glutenFree}
                  label="Gluten Free"
                  toggle={true}
                  onChange={() => {
                    let newPreferences={};

                    for (let i in this.state.userPreferences) {
                      newPreferences[i] = this.state.userPreferences[i];
                    }
        
                    newPreferences.glutenFree = !newPreferences.glutenFree
                    this.setState(() => {
                      return {userPreferences: newPreferences};
                      });
                    }}
                />
              </Grommet>
            </div>
            <div className="preferenceOptions">
              <Grommet theme={deepMerge(grommet, customToggleTheme)}>
                <CheckBox
                  checked={this.state.userPreferences.keto}
                  label="Keto"
                  toggle={true}
                  onChange={() => {
                    let newPreferences = {};

                    for (let i in this.state.userPreferences) {
                      newPreferences[i] = this.state.userPreferences[i];
                    }

                    newPreferences.keto = !newPreferences.keto
                    this.setState(() => {
                      return { userPreferences: newPreferences };
                    });
                  }}
                />
              </Grommet>
            </div>
            <div className="preferenceOptions">
              <Grommet theme={deepMerge(grommet, customToggleTheme)}>
                <CheckBox
                  checked={this.state.userPreferences.vegan}
                  label="Vegan"
                  toggle={true}
                  onChange={() => {
                    let newPreferences = {};

                    for (let i in this.state.userPreferences) {
                      newPreferences[i] = this.state.userPreferences[i];
                    }

                    newPreferences.vegan = !newPreferences.vegan
                    this.setState(() => {
                      return { userPreferences: newPreferences };
                    });
                  }}
                />
              </Grommet>
            </div>
            <div className="preferenceOptions">
              <Grommet theme={deepMerge(grommet, customToggleTheme)}>
                <CheckBox
                  checked={this.state.userPreferences.vegetarian}
                  label="Vegetarian"
                  toggle={true}
                  onChange={() => {
                    let newPreferences = {};

                    for (let i in this.state.userPreferences) {
                      newPreferences[i] = this.state.userPreferences[i];
                    }

                    newPreferences.vegetarian = !newPreferences.vegetarian
                    this.setState(() => {
                      return { userPreferences: newPreferences };
                    });
                  }}
                />
              </Grommet>
            </div>
            <div className="inputContainer">
              <p id="preferencesInputInstructions">Other Allergies or Restrictions:</p>
            <input id="allergiesInput" placeholder="ex: Peanuts, fish, dairy, etc..."></input>
            </div>
          </div>
          <Button className="primary_button preferenceButtons" primary >Remove from menu</Button>
        <NavBar />
        </div>
    )
  }
}

export default withRouter(Preferences);