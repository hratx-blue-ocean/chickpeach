import React from 'react';
import MaterialIcon from 'material-icons-react';
import { RemoveAllergy, MouseHandler } from './actions';
import { useSelector, useDispatch } from 'react-redux';

const AllergyItem = (props) => {
  let dispatch = useDispatch();
  let state = useSelector(state => state.prefAppState);

  return (
    <div className="AllergyCancelContainer">
      <li className="preferencesAllergyItem"
        // onMouseEnter={() => dispatch(MouseHandler(true))} onMouseLeave={() => dispatch(MouseHandler(false))}
        style={{ cursor: "pointer", color: (state.onHover ? "#FFB084" : "#444444") }}>{props.allergy}</li>
      <div className="preferenceIconContainer" style={{ cursor: "pointer" }}
        // onMouseEnter={() => dispatch(MouseHandler(true))} onMouseLeave={() => dispatch(MouseHandler(false))}
        onClick={() => dispatch(RemoveAllergy(props.allergy))}>
        {state.onHover ? <div><MaterialIcon icon="cancel" color="#FFB084" size={18} /></div> : <div> <MaterialIcon icon="cancel" color="#EBEDEF" size={18} /> </div>}
      </div>
    </div>
  )
}

export default AllergyItem;