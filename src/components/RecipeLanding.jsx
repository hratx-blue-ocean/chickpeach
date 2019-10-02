import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuery, updateSearch } from './actions';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Heading, TextInput, Button } from 'grommet';
import MaterialIcon from 'material-icons-react';
import NavBar from './NavBar.jsx';
import RecipeCard from './RecipeCard.jsx';

const RecipeLanding = (props) => {
  const dispatch = useDispatch();
  const search = useSelector(state => state.search);
  const preferences = useSelector(state => state.Preferences);

  const searchForRecipes = () => {
    axios.get('/searchRecipes', {
        params: {
          // diet: preferences.TBD,
          // banList: preferences.TBD,
          allergenList: preferences.addedAllergies,
          searchInput: search.query
        }
      })
      .then(({ data }) => console.log(data))
      .catch(error => console.log(error));
  };

  return (
    <div>
      <Heading className="header1">Recipes</Heading>
      <div className="recipes">
        <div className="recipes_search">
          <TextInput
            placeholder="type here"
            plain={true}
            value={search.query}
            onChange={event => dispatch(updateQuery(event.target.value))}
          />
          <Button
            id="recipes_submit"
            onClick={() => searchForRecipes()}>
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