DROP DATABASE IF EXISTS chickpeach;

CREATE DATABASE chickpeach;

USE chickpeach;

CREATE TABLE Users (
    id VARCHAR(64) PRIMARY KEY,
    name TEXT,
    portions_per_week INT,
    portions_fulfilled INT
);

CREATE TABLE Recipes (
    id INT PRIMARY KEY,
    title TEXT,
    image TEXT,
    nutrient_id INT,
    servings INT,
    prep_time INT
);

CREATE TABLE Ingredients (
    id INT PRIMARY KEY,
    name TEXT,
    image TEXT
);

CREATE TABLE Nutrients (
    id INT PRIMARY KEY,
    calories INT,
    carbs TEXT,
    fat TEXT,
    fiber TEXT,
    protein TEXT,
    sodium TEXT,
    sugar TEXT
);

CREATE TABLE Banned_Ingredients (
    id INT PRIMARY KEY,
    user_id VARCHAR(64),
    name TEXT
);

CREATE TABLE Cooking_Instructions (
    id INT PRIMARY KEY,
    recipe_id INT,
    step_number INT,
    step TEXT
);

CREATE TABLE Users_Recipes (
    id INT PRIMARY KEY,
    user_id VARCHAR(64),
    recipe_id INT,
    is_saved BOOLEAN,
    is_favorited BOOLEAN,
    is_on_menu BOOLEAN,
    created_by TEXT
);

CREATE TABLE Recipes_Ingredients (
    id INT PRIMARY KEY,
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
ADD FOREIGN KEY (nutrient_id) REFERENCES nutrients (id);

ALTER TABLE Recipes_Ingredients 
ADD FOREIGN KEY (recipe_id) REFERENCES Recipes (id);

ALTER TABLE Recipes_Ingredients 
ADD FOREIGN KEY (ingredient_id) REFERENCES Ingredients (id);