import React, { Component } from 'react';
import { Button } from 'grommet';

const MenuCard = (props) => {
  return (
    <div className="card">
      <div>
        <img src="https://shazamazon.s3.us-east-2.amazonaws.com/wands/chickpeach/yum.png"></img>
      </div>
      <div className="card_bottom">
        <div className="card_text">
          <h4 className="card_name">
            Street Corn
          </h4>
          <p className="card_servings">
            4 servings
          </p>
        </div>
        <div className="card_footer menu_footer">
          <Button
            icon={'Preview'}
            label
            onClick={() => {}}
          />
          <Button
            icon={'Cook'}
            label
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default MenuCard;