import React from 'react';
import Modal from './PreferencesModal.jsx';
import data from '../../db/dummyPreferenceData';

class Preferences extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userPreferenes: {}
    };
  }

  componentDidMount() {
    this.setData();
  }

  setData() {
    this.setState(() => {
      return {}
    });
  }
  

  render() {
    return (
      <div id="preferencesContainer">
        <Modal 

        />
        <h1 className="header1">Preferences</h1>
      </div>
    )
  }
}

export default Preferences;