import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Heading, TextInput, Select, Button, TextArea } from 'grommet';
import MaterialIcon from 'material-icons-react';
import NavBar from './NavBar.jsx';

const dummyRecipe = {
  title: 'Pad Thai',
  images: ['https://images.unsplash.com/photo-1473093226795-af9932fe5856?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1885&q=80'],
  ingredients: [
    '5 ounces pad Thai rice noodles',
    '3 tablespoons vegetable oil',
    '1 large egg, room temperature',
    '6 medium shrimp, peeled, deveined (optional)',
    '2 tablespoons 1x½x⅛-inch slices pressed tofu (bean curd)',
    '1 tablespoon sweet preserved shredded radish, rinsed, chopped into 1-inch pieces',
    '1 cup bean sprouts',
    '5 tablespoons tamarind water, or 2 tablespoons plus 1 teaspoon tamarind paste mixed with 2 tablespoons plus 1 teaspoon water',
    '1½ tablespoons (or more) Thai fish sauce (nam pla)',
    '1½ tablespoons simple syrup, preferably made with palm sugar',
    '4 garlic chives, 2 cut into 1-inch pieces',
    '½ teaspoon ground dried Thai chiles, divided',
    '2 tablespoons crushed roasted, unsalted peanuts, divided',
    '2 lime wedges',
  ],
  directions: [
    'Place noodles in a large bowl; pour hot water over to cover. Let soak until tender but not mushy, 5–10 minutes. Drain; set aside.',
    'Heat vegetable oil in a wok or large skillet over medium-high heat. Add egg; stir until barely set, about 30 seconds. Add shrimp, if using. Cook, stirring, until shrimp and egg are almost cooked through, 2–3 minutes. Add tofu and radish; cook for 30 seconds. Add noodles and cook for 1 minute. Stir in sprouts. Add tamarind water, fish sauce, and simple syrup and stir-fry until sauce is absorbed by noodles and noodles are well coated, about 1 minute. Stir in chopped garlic chives. Add 1/4 tsp. ground chiles and 1 Tbsp. peanuts and toss well. Transfer to serving plates.',
    'Garnish with remaining 1/4 tsp. ground chiles, 1 Tbsp. peanuts, and lime wedges.',
  ],
  nutrition_info: {
    calories: 500,
    carbs: '37g',
    sugar: '16g',
    fat: '39g',
    sodium: '1073mg',
    fiber: '9g',
    net_carbs: '28g',
    added_sugar: '0g',
    saturated_fat: '26g',
    protein: '20g'
  }
};

class CreateRecipe extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      recipe: dummyRecipe
    };
  }

  render() {
    return (
      <div>
        <Heading className="header1">Create Recipe</Heading>
        <div className="create">
          <h4>Title</h4>
          <TextInput
            id="create_title"
            placeholder="type here"
            // value={value}
            onChange={event => setValue(event.target.value)}
          />
          <h4>Add Ingredients</h4>
          <div className="ingredients_container">
            <div className="create_ingredientName">
              <TextInput
                placeholder="name"
                // value={value}
                onChange={event => setValue(event.target.value)}
              />
            </div>
            <div className="create_ingredientQty">
              <TextInput
                placeholder="quantity"
                size="small"
                // value={value}
                onChange={event => setValue(event.target.value)}
              />
            </div>
            <div>
              <Select
                id="create_measurement"
                options={['metric', 'imperial']}
                size={'small'}
                value={'measurement'}
                onChange={({ option }) => this.setState({view: option})}
              />
            </div>
          </div>
          <Button
            className="create_add"
            icon={ <MaterialIcon icon="add" color='whitesmoke' size={24} /> }
            label
            onClick={() => {}}
          />
          <div className="ingredients_container create_directions">
            <h4>Add Directions</h4>
            <div className= "create_addDirections">
              <TextArea
                fill={true}
                placeholder="type here"
                // value={value}
                onChange={event => setValue(event.target.value)}
              />
            </div>
          </div>
          <Button
            className="create_add"
            icon={ <MaterialIcon icon="add" color='whitesmoke' size={24} /> }
            label
            onClick={() => {}}
          />
          <h4>{'[USER TITLE]'}</h4>
        </div>
        <div className="grey_container">
          <h3>Ingredients</h3>
          {
            this.state.recipe.ingredients.map(ingredient => {
              return <p className="recipe_ingredient" key={ingredient}>{ingredient}</p>
            })
          }
        </div>
        <div id="recipe_directions_container" className="create_directionsContainer">
          <h3 className="recipe_directions_label">Directions</h3>
          {
            this.state.recipe.directions.map((step, index) => {
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
                    label
                    onClick={() => {}}
                  />
                </div>
              )
            })
          }
        </div>
        <NavBar />
      </div>
    )
  }
}

export default withRouter(CreateRecipe);