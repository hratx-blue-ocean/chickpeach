import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Heading, TextInput, Button } from 'grommet';
import MaterialIcon from 'material-icons-react';
import NavBar from './NavBar.jsx';
import RecipeCard from './RecipeCard.jsx';

class RecipeLanding extends React.Component {
  constructor(props) {
    super(props)
    this.state = {};
  }

  render() {
    return (
      <div>
        <Heading className="header1">Recipes</Heading>
        <div className="recipes">
          <div className="recipes_search">
            <TextInput
              placeholder="type here"
              plain={true}
            />
            <Button
              id="recipes_submit"
              icon={ <MaterialIcon icon="create" color='whitesmoke' size={20} /> }
              label
              onClick={() => {}}
            />
          </div>
          <hr className="recipes_divider" />
          <div className="card_container">
            <RecipeCard />
            <RecipeCard />
          </div>
        </div>
        <NavBar />
      </div>
    )
  }
}

export default withRouter(RecipeLanding);