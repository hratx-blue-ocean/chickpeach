import React from 'react';
import NavBar from './NavBar.jsx'

class Template extends React.Component {
  constructor(props) {
    super(props)
    this.state = {};
  }

  render() {
    return (
      <div id='changethis_container'>
        <h1 className={'header1'}>Template</h1>

        <NavBar />
      </div>
    )
  }
}

export default Template;