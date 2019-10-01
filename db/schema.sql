DROP DATABASE IF EXISTS chickpeach;

CREATE DATABASE chickpeach;

USE chickpeach;

CREATE TABLE Users (
    id VARCHAR(64) PRIMARY KEY,
    name TEXT,
    people_to_prep_for INT,
    portions_per_week INT,
    portions_fulfilled INT
);

CREATE TABLE Preferences (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id VARCHAR(64),
    egg BOOLEAN,
    grain BOOLEAN,
    peanut BOOLEAN,
    seafood BOOLEAN,
    shellfish BOOLEAN,
    sesame BOOLEAN,
    soy BOOLEAN,
    sulfite BOOLEAN,
    tree_nut BOOLEAN,
    wheat BOOLEAN,
    vegetarian BOOLEAN,
    vegan BOOLEAN,
    gluten_free BOOLEAN,
    dairy_free BOOLEAN,
    ketogenic BOOLEAN,
    whole_thirty BOOLEAN,
    use_metric BOOLEAN
);

CREATE TABLE Recipes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title TEXT,
    image TEXT,
    nutrient_id INT,
    servings INT,
    prep_time INT
);

CREATE TABLE Ingredients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name TEXT,
    image TEXT,
    aisle TEXT
);

CREATE TABLE Nutrients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    calories INT,
    carbs TEXT,
    fat TEXT,
    fiber TEXT,
    protein TEXT,
    sodium TEXT,
    sugar TEXT
);

CREATE TABLE Banned_Ingredients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id VARCHAR(64),
    name TEXT
);

CREATE TABLE Cooking_Instructions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    recipe_id INT,
    step_number INT,
    step TEXT
);

CREATE TABLE Users_Recipes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id VARCHAR(64),
    recipe_id INT,
    is_saved BOOLEAN,
    is_favorited BOOLEAN,
    is_on_menu BOOLEAN,
    created_by_user BOOLEAN
);

CREATE TABLE Recipes_Ingredients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    recipe_id INT,
    ingredient_id INT,
    quantity INT,
    unit TEXT
);

ALTER TABLE Users_Recipes 
ADD FOREIGN KEY (user_id) REFERENCES Users (id);

ALTER TABLE Users_Recipes 
ADD FOREIGN KEY (recipe_id) REFERENCES Recipes (id);

ALTER TABLE Banned_Ingredients 
ADD FOREIGN KEY (user_id) REFERENCES Users (id);

ALTER TABLE Cooking_Instructions 
ADD FOREIGN KEY (recipe_id) REFERENCES Recipes (id);

ALTER TABLE Recipes 
ADD FOREIGN KEY (nutrient_id) REFERENCES Nutrients (id);

ALTER TABLE Preferences 
ADD FOREIGN KEY (user_id) REFERENCES Users (id);

ALTER TABLE Recipes_Ingredients 
ADD FOREIGN KEY (recipe_id) REFERENCES Recipes (id);

ALTER TABLE Recipes_Ingredients 
ADD FOREIGN KEY (ingredient_id) REFERENCES Ingredients (id);