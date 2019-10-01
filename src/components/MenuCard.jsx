import React, { Component } from 'react';
import { Button } from 'grommet';

const MenuCard = (props) => {
  return (
    <div className="menu_container">
      <div className="menu_image">
        <img src="https://shazamazon.s3.us-east-2.amazonaws.com/wands/chickpeach/yum.png"></img>
      </div>
      <div className="menu_bottom">
        <div className="menu_text">
          <h4 className="menu_name">
            Street Corn
          </h4>
          <p className="menuservings">
            4 servings
          </p>
        </div>
        <div className="menu_footer">
          <Button
            className="menu_button menu_preview"
            icon={'Preview'}
            label
            onClick={() => {}}
          />
          <Button
            className="menu_button menu_save"
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