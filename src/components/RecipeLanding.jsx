import React, {Component} from 'react';
import { Heading, TextInput, Button } from 'grommet';
import MaterialIcon from 'material-icons-react';
import NavBar from './NavBar.jsx'

class Template extends React.Component {
  constructor(props) {
    super(props)
    this.state = {};
  }

  render() {
    return (
      <div>
        <Heading className="header1">Recipes</Heading>
        <div className="recipes_search">
          <TextInput
            placeholder="type here"
            plain={true}
          />
          <Button
            id="recipes_button"
            icon={ <MaterialIcon id="#recipes_searchIcon" icon="create" color='whitesmoke' size={40} /> }
            label
            onClick={() => {}}
          />
        </div>
        <hr className="recipes_searchDivider" />
        <NavBar />
      </div>
    )
  }
}

export default Template;