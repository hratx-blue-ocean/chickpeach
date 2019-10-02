import React, { Component } from 'react';
import MaterialIcon from 'material-icons-react';

class AllergyItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onHover: false
    }
  }

  mouseHandler(boolean) {
    console.log(boolean)
    this.setState({ onHover: boolean });
  }

  render() {
    return (
      <div className="AllergyCancelContainer">
        <li className="preferencesAllergyItem"
          onMouseEnter={() => this.mouseHandler(true)} onMouseLeave={() => this.mouseHandler(false)}
          style={{ cursor: "pointer", color: (this.state.onHover ? "#FFB084" : "#444444") }}>{this.props.allergy}</li>
        <div className="preferenceIconContainer" style={{ cursor: "pointer" }}
          onMouseEnter={() => this.mouseHandler(true)} onMouseLeave={() => this.mouseHandler(false)}
          onClick={() => this.props.removeAllergy(this.props.allergy)}>
          {this.state.onHover ? <div><MaterialIcon icon="cancel" color="#FFB084" size={18} /></div> : <div> <MaterialIcon icon="cancel" color="#EBEDEF" size={18} /> </div>}
        </div>
      </div>
    )
  }
}

export default AllergyItem;