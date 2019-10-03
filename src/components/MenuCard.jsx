import React from 'react';
import { withRouter } from "react-router-dom";
import { Button } from 'grommet';

const MenuCard = (props) => {
  const onClick = (id) => {
    return (
      // <Redirect to={{
      //   pathname: '/recipeView',
      //   props: {
      //     id: id
      //   }
      // }} />
      props.history.replace({
        pathname: '/recipeView',
        state: {id: id}
      })
    )
  };

  return (
    <div className="card">
      <div>
        <img src="https://shazamazon.s3.us-east-2.amazonaws.com/wands/chickpeach/yum.png"></img>
      </div>
      <div className="card_bottom">
        <div className="card_text">
          <h4 className="card_name">
            {props.recipe.title}
          </h4>
          <p className="card_servings">
            {props.recipe.servings}
          </p>
        </div>
        <div className="card_footer menu_footer">
          <Button onClick={() => {onClick(props.recipe.id)}}>Preview</Button>
          <Button onClick={() => {}}>Cook</Button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(MenuCard);