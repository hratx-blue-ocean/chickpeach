INSERT INTO Users (id, name) VALUES ('a123', 'Test Dummy');

INSERT INTO Preferences (
    user_id,
    allergy_egg,
    allergy_grain,
    allergy_peanut,
    allergy_seafood,
    allergy_shellfish,
    allergy_sesame,
    allergy_soy,
    allergy_sulfite,
    allergy_tree_nut,
    allergy_wheat,
    allergy_gluten,
    allergy_dairy,
    diet,
    use_metric,
    people_to_prep_for,
    meals_per_week
) VALUES (
    'a123',
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    'keto',
    false,
    1,
    5
);

INSERT INTO Recipes (
    title,
    image,
    servings,
    prep_time,
    created_by_user,
    calories,
    carbs,
    fat,
    fiber,
    protein,
    sodium,
    sugar
) VALUES (
    'Chicken Salad',
    'https://www.spendwithpennies.com/wp-content/uploads/2019/08/Classic-Chicken-Salad-Sandwich3-SpendWithPennies.jpg',
    4,
    15,
    true,
    145,
    '21',
    '5',
    '15',
    '25',
    '500',
    '4'
);

INSERT INTO Recipes (
    title,
    image,
    servings,
    prep_time,
    created_by_user,
    calories,
    carbs,
    fat,
    fiber,
    protein,
    sodium,
    sugar
) VALUES (
    'Egg Salad',
    'https://www.jessicagavin.com/wp-content/uploads/2018/02/egg-salad-2-1200.jpg',
    4,
    15,
    true,
    145,
    '21',
    '5',
    '15',
    '25',
    '500',
    '4'
);

INSERT INTO Ingredients (
    name,
    image,
    aisle,
    recipe_id,
    quantity,
    unit
) VALUES (
    'Chicken',
    'https://previews.123rf.com/images/dulsita/dulsita1307/dulsita130700068/21201847-pieces-of-raw-chicken-meat.jpg',
    'Meat',
    1,
    5,
    'Full Chickens'
);

INSERT INTO Ingredients (
    name,
    image,
    aisle,
    recipe_id,
    quantity,
    unit
) VALUES (
    'Eggs',
    'https://previews.123rf.com/images/dulsita/dulsita1307/dulsita130700068/21201847-pieces-of-raw-chicken-meat.jpg',
    'Milk and Eggs',
    2,
    5,
    ''
);

INSERT INTO Banned_Ingredients (
    user_id,
    name
) VALUES (
    'a123',
    'Sea Urchin'
);

INSERT INTO Cooking_Instructions (
    recipe_id,
    step_number,
    step
) VALUES (
    1,
    1,
    'Combine all ingredients in a small bowl and mix well.'
);

INSERT INTO Cooking_Instructions (
    recipe_id,
    step_number,
    step
) VALUES (
    1,
    2,
    'Season with salt and pepper to taste.'
);

INSERT INTO Cooking_Instructions (
    recipe_id,
    step_number,
    step
) VALUES (
    1,
    3,
    'Serve as a sandwich or over salad.'
);

INSERT INTO Cooking_Instructions (
    recipe_id,
    step_number,
    step
) VALUES (
    2,
    1,
    'Combine all ingredients in a small bowl and mix well.'
);

INSERT INTO Cooking_Instructions (
    recipe_id,
    step_number,
    step
) VALUES (
    2,
    2,
    'Season with salt and pepper to taste.'
);

INSERT INTO Cooking_Instructions (
    recipe_id,
    step_number,
    step
) VALUES (
    2,
    3,
    'Serve as a sandwich or over salad.'
);

INSERT INTO Users_Recipes (
    user_id,
    recipe_id,
    is_saved,
    is_favorited,
    is_on_menu
) VALUES (
    'a123',
    1,
    true,
    true,
    true
);

INSERT INTO Users_Recipes (
    user_id,
    recipe_id,
    is_saved,
    is_favorited,
    is_on_menu
) VALUES (
    'a123',
    2,
    true,
    true,
    true
);