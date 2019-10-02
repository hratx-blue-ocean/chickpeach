import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuery, updateSearch } from './actions';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Heading, TextInput, Button } from 'grommet';
import MaterialIcon from 'material-icons-react';
import NavBar from './NavBar.jsx';
import RecipeCard from './RecipeCard.jsx';

const searchForRecipes = () => {
  
}

const RecipeLanding = (props) => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.search);

  return (
    <div>
      <Heading className="header1">Recipes</Heading>
      <div className="recipes">
        <div className="recipes_search">
          <TextInput
            placeholder="type here"
            plain={true}
            value={state.query}
            onChange={event => dispatch(updateQuery(event.target.value))}
          />
          <Button
            id="recipes_submit"
            onClick={() => {console.log(state)}}>
              <MaterialIcon icon="create" color='whitesmoke' size={20} />
            </Button>
        </div>
        <hr className="recipes_divider" />
        <div className="card_container">
          {
            props.recipes.map(recipe => {
              return <RecipeCard recipe={recipe}/>
            })
          }
        </div>
      </div>
      <NavBar />
    </div>
  )
}

export default withRouter(RecipeLanding);