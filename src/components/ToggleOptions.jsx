import React from 'react';
import customToggleTheme from './grommet/toggle';
import { deepMerge } from "grommet/utils";
import { grommet } from "grommet/themes";
import { CheckBox, Grommet } from 'grommet';
import { useSelector, useDispatch } from 'react-redux';
import { UpdateToggles } from './actions';

const ToggleOptions = (props) => {
  let babel = {
    gluten: 'Gluten',
    dairy: 'Dairy',
    egg: 'Eggs',
    grain: 'Grain',
    peanut: 'Peanuts',
    seafood: 'Seafood',
    sesame: 'Sesame',
    shellfish: 'Shellfish',
    soy: 'Soy',
    sulfite: 'Sulfite',
    treeNut: 'Tree Nuts',
    wheat: 'Wheat',
  }

  let dispatch = useDispatch();

  return (
    <div className="preferenceOptions">
      <Grommet theme={deepMerge(grommet, customToggleTheme)}>
        <CheckBox
          checked={props.toggleArray[1]}
          label={babel[props.toggleArray[0]]}
          toggle={true}
          onChange={() => {
            dispatch(UpdateToggles([props.toggleArray[0], !props.toggleArray[1]]));
          }}
        />
      </Grommet>
    </div>
  )
}

export default ToggleOptions;