import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Heading, TextInput, Select, Button, TextArea } from 'grommet';
import MaterialIcon from 'material-icons-react';
import NavBar from './NavBar.jsx';

class CreateRecipe extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <Heading className="header1">Create Recipe</Heading>
        <div className="menu">
          <p>Title</p>
          <TextInput
            placeholder="type here"
            // value={value}
            onChange={event => setValue(event.target.value)}
          />
          <p>Add Ingredients</p>
          <TextInput
            placeholder="type here"
            // value={value}
            onChange={event => setValue(event.target.value)}
          />
          <TextInput
            placeholder="type here"
            // value={value}
            onChange={event => setValue(event.target.value)}
          />
          <Select
            options={['metric', 'imperial']}
            size={'small'}
            value={'measurement'}
            onChange={({ option }) => this.setState({view: option})}
          />
          <Button
            icon={ <MaterialIcon icon="add" color='whitesmoke' size={24} /> }
            label
            onClick={() => {}}
          />
          <p>Add Directions</p>
          <TextArea
            placeholder="type here"
            // value={value}
            onChange={event => setValue(event.target.value)}
          />
          <Button
            icon={ <MaterialIcon icon="add" color='whitesmoke' size={24} /> }
            label
            onClick={() => {}}
          />
        </div>
        <NavBar />
      </div>
    )
  }
}

export default withRouter(CreateRecipe);