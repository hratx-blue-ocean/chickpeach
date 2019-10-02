import React from 'react';
import customToggleTheme from './grommet/toggle';
import { deepMerge } from "grommet/utils";
import { grommet } from "grommet/themes";
import { CheckBox, Grommet } from 'grommet';

const ToggleOptions = (props) => {
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

export default ToggleOptions;