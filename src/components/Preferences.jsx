import React, { Component }from 'react';
import { CheckBox, Grommet, Button, Box, Menu, Text, RadioButton } from 'grommet';
import { storiesOf } from "@storybook/react";
import { grommet } from "grommet/themes";
import { FormDown } from "grommet-icons";
import { deepMerge } from "grommet/utils";
import { css } from "styled-components";
import NavBar from './NavBar.jsx'
import data from '../../db/dummyPreferenceData';
import { withRouter } from 'react-router-dom';
import MaterialIcon from 'material-icons-react';

/*///////////////////////////////////////////////////////////////////////////
//////////////     GROMMET RADIO BUTTON   ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////*/

const customTheme = deepMerge(grommet, {
  radioButton: {
    gap: "xsmall",
    size: "18px",
    hover: {
      border: {
        color: "dark-3"
      }
    },
    check: {
      color: {
        light: "neutral-1"
      }
    },
    icon: {
      size: "10px"
    }
  }
});


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

    let fullArray = this.state.userPreferences1.concat(this.state.userPreferences2);

    for (let option of fullArray) {
      newState[option[0]] = option[1];
    }

    newState.addedAllergies = this.state.addedAllergies;
    newState.peopleToPrepFor = this.state.people;
    newState.isMetric = this.state.isMetric;

      // 'vegetarian'
      // 'glutenFree'
      // 'vegan'
      // 'dairyFree'
      // 'keto'
      // 'whole30'
      // 'egg'
      // 'grain'
      // 'peanut'
      // 'seafood'
      // 'sesame'
      // 'shellfish'
      // 'soy'
      // 'sulfite'
      // 'treeNut'
      // 'wheat'

    

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
                <Option 
                  updateData={this.updateData.bind(this)}
                  toggleArray={toggleArray}
                  key={index}
                />
              )
            }) : null }

          {this.state.page === 1 ? this.state.userPreferences2.map((toggleArray, index) => {
            return (
              <Option
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
                {/* <CustomMenu /> */}
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

/*///////////////////////////////////////////////////////////////////////////
////////////////     ON PAGE COMPONENTS   ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////*/

const Option = (props) => {
  let babel = {
    vegetarian: 'Vegetarian',
    glutenFree: 'Gluten Free',
    keto: 'Keto',
    vegan: 'Vegan',
    dairyFree: 'Dairy Free',
    whole30: 'Whole 30',
    egg: 'Egg',
    grain: 'Grain',
    peanut: 'Peanut',
    seafood: 'Seafood',
    sesame: 'Sesame',
    shellfish: 'Shellfish',
    soy: 'Soy',
    sulfite: 'Sulfite',
    treeNut: 'TreeNut',
    wheat: 'Wheat',
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

// const CustomMenu = () => (
//   <Grommet theme={grommet}>
//     <Box
//       align="center"
//       pad="large"
//       background={{ color: "default", opacity: 0.7 }}
//     >
//       <Menu
//         plain
//         items={[
//           { label: "Launch", onClick: () => { } },
//           { label: "Abort", onClick: () => { } }
//         ]}
//       >
//         {({ drop, hover }) => {
//           const color = hover && !drop ? "accent-1" : undefined;
//           return (
//             <Box
//               direction="row"
//               gap="small"
//               pad="small"
//               background={hover && drop ? "default" : undefined}
//             >
//               <Text color={color}>Amount</Text>
//               <FormDown color={color} />
//             </Box>
//           );
//         }}
//       </Menu>
//     </Box>
//   </Grommet>
// );

// storiesOf("Menu", module).add("Custom", () => <CustomMenu />);

export default Preferences;

