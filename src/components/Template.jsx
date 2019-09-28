import React from 'react';

class Template extends React.Component {
  constructor(props) {
    super(props)
    this.state = {};
  }

  render() {
    return (
      <div id='changethis_container'>
        <h1 className={'header1'}>Template</h1>
      </div>
    )
  }
}

export default Template;