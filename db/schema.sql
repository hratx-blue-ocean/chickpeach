DROP DATABASE IF EXISTS chickpeach;

CREATE DATABASE chickpeach;

USE chickpeach;

CREATE TABLE Users (
    id VARCHAR(64) PRIMARY KEY,
    name TEXT
);

CREATE TABLE Preferences (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id VARCHAR(64),
    allergy_egg BOOLEAN,
    allergy_grain BOOLEAN,
    allergy_peanut BOOLEAN,
    allergy_seafood BOOLEAN,
    allergy_shellfish BOOLEAN,
    allergy_sesame BOOLEAN,
    allergy_soy BOOLEAN,
    allergy_sulfite BOOLEAN,
    allergy_tree_nut BOOLEAN,
    allergy_wheat BOOLEAN,
    diet_vegetarian BOOLEAN,
    diet_vegan BOOLEAN,
    diet_gluten_free BOOLEAN,
    diet_dairy_free BOOLEAN,
    diet_ketogenic BOOLEAN,
    diet_whole_thirty BOOLEAN,
    use_metric BOOLEAN,
    people_to_prep_for INT,
    meals_per_week INT
);

CREATE TABLE Recipes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title TEXT,
    image TEXT,
    servings INT,
    prep_time INT,
    created_by_user BOOLEAN,
    calories INT,
    carbs TEXT,
    fat TEXT,
    fiber TEXT,
    protein TEXT,
    sodium TEXT,
    sugar TEXT
);

CREATE TABLE Ingredients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name TEXT,
    image TEXT,
    aisle TEXT,
    recipe_id INT,
    quantity INT,
    unit TEXT
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
    is_on_menu BOOLEAN
);

ALTER TABLE Users_Recipes 
ADD FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE;

ALTER TABLE Users_Recipes 
ADD FOREIGN KEY (recipe_id) REFERENCES Recipes (id) ON DELETE CASCADE;

ALTER TABLE Banned_Ingredients 
ADD FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE;

ALTER TABLE Cooking_Instructions 
ADD FOREIGN KEY (recipe_id) REFERENCES Recipes (id) ON DELETE CASCADE;

ALTER TABLE Preferences 
ADD FOREIGN KEY (user_id) REFERENCES Users (id);
