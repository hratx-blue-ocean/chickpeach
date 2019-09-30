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
    ingredients TEXT,
    nutrition_facts TEXT,
    cooking_instructions TEXT
);

CREATE TABLE Banned_Ingredients (
    id INT PRIMARY KEY,
    user_id VARCHAR(64),
    name TEXT
);

CREATE TABLE Users_Recipes (
    id INT PRIMARY KEY,
    user_id VARCHAR(64),
    recipe_id INT,
    is_saved BOOLEAN,
    is_favorited BOOLEAN,
    is_on_menu BOOLEAN
);

ALTER TABLE Users_Recipes 
ADD FOREIGN KEY (user_id) REFERENCES Users (id);

ALTER TABLE Banned_Ingredients 
ADD FOREIGN KEY (user_id) REFERENCES Users (id);

ALTER TABLE Users_Recipes 
ADD FOREIGN KEY (recipe_id) REFERENCES Recipes (id);