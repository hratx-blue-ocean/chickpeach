import React, { Component, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Heading, TextInput, Select, Button, TextArea } from 'grommet';
import MaterialIcon from 'material-icons-react';
import NavBar from './NavBar.jsx';

const CreateRecipe = (props) => {

  const [userRecipe, updateUserRecipe] = useState(props.recipe)
  return (
    <div>
      <Heading className="header1">Create Recipe</Heading>
      <div className="create">
        <h4>Title</h4>
        <TextInput
          id="create_title"
          placeholder="type here"
          // value={value}
          //onChange={event => setValue(event.target.value)}
        />
        <h4>Add Ingredients</h4>
        <div className="ingredients_container">
          <div className="create_ingredientName">
            <TextInput
              placeholder="name"
              // value={value}
              //onChange={event => setValue(event.target.value)}
            />
          </div>
          <div className="create_ingredientQty">
            <TextInput
              placeholder="quantity"
              size="small"
              // value={value}
              //onChange={event => setValue(event.target.value)}
            />
          </div>
          <div>
            <Select
              id="create_measurement"
              options={['metric', 'imperial']}
              size={'small'}
              value={'measurement'}
              //onChange={({ option }) => this.setState({view: option})}
            />
          </div>
        </div>
        <Button
          className="create_add primary_button"
          icon={ <MaterialIcon icon="add" color='whitesmoke' size={24} /> }
          onClick={() => {}}
        />
        <div className="ingredients_container create_directions">
          <h4>Add Directions</h4>
          <div className= "create_addDirections">
            <TextArea
              fill={true}
              placeholder="type here"
              // value={value}
              //onChange={event => setValue(event.target.value)}
            />
          </div>
        </div>
        <Button
          className="create_add primary_button"
          icon={ <MaterialIcon icon="add" color='whitesmoke' size={24} /> }
          onClick={() => {}}
        />
        <h4>{'[USER TITLE]'}</h4>
      </div>
      {/* <div className="grey_container">
        <h3>Ingredients</h3>
        {
          userRecipe.ingredients.map(ingredient => {
            return <p className="recipe_ingredient" key={ingredient}>{ingredient}</p>
          })
        }
      </div>
      <div id="recipe_directions_container" className="create_directionsContainer">
        <h3 className="recipe_directions_label">Directions</h3>
        {
          userRecipe.directions.map((step, index) => {
            return (
              <div className="recipe_step create_steps" key={index}>
                <div className="create_step">
                  <div className="recipe_step_number">{index + 1 + '.'}</div>
                  <div>{step}</div>
                </div>
                <Button
                  className="secondary_button"
                  id="create_erase"
                  icon={ <MaterialIcon id="create_delete" icon="delete_forever" color='whitesmoke' size={20} /> }
                  onClick={() => {}}
                />
              </div>
            )
          })
        }
      </div> */}
      <NavBar />
    </div>
  )
  
}

export default withRouter(CreateRecipe);