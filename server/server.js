const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const axios = require('axios');
const bodyParser = require('body-parser');
// const { spoonAPIKey } = require('../spoonAPI.config.js');
const mysql = require('mysql2');

const pool = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'chickpeach',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.use(express.static('dist'));
app.use(bodyParser.json());

//add user to database

app.get('/register', (req, res) => {
  pool.query(`INSERT INTO Users (id, name, people_to_prep_for, portions_per_week, portions_fulfilled) VALUES ("${req.query.id}", "${req.query.name}");`, (err, rows, fields) => {
    if (err) console.log(err);

    res.status(201).send('success');
  });
});

//get user by id

app.get('/user', (req, res) => {
  pool.query(`SELECT * FROM Users where id = '${req.query.id}';`, (err, rows, fields) => {
    if (err) console.log(err);

    res.status(200).send(rows);
  });
});

//get user preferences

app.get('/userpreferences', (req, res) => {
  pool.query(`SELECT * FROM Preferences where user_id = '${req.query.id}';`, (err, rows, fields) => {
    if (err) {
      console.error(err);
    } else {
      let row = rows[0];
      let userPreferencesData = {
        vegetarian: !!row.diet_vegetarian,
        glutenFree: !!row.diet_gluten_free,
        keto: !!row.diet_ketogenic,
        vegan: !!row.diet_vegan,
        dairyFree: !!row.diet_dairy_free,
        whole30: !!row.diet_whole_thirty,
        egg: !!row.allergy_egg,
        grain: !!row.allergy_grain,
        peanut: !!row.allergy_peanut,
        seafood: !!row.allergy_seafood,
        sesame: !!row.allergy_sesame,
        shellfish: !!row.allergy_shellfish,
        soy: !!row.allergy_soy,
        sulfite: !!row.allergy_sulfite,
        treeNut: !!row.allergy_tree_nut,
        wheat: !!row.allergy_wheat,
        peopleToPrepFor: row.people_to_prep_for,
        addedAllergies: [], //**replace with an array of allergies
        isMetric: !!row.use_metric,
        numberOfMeals: row.meals_per_week
      }

      res.status(200).send(userPreferencesData);
    }
  });
});

//create user preferences

app.get('/createpreferences', (req, res) => {
  pool.query(`INSERT INTO Preferences (
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
                diet_vegetarian,
                diet_vegan,
                diet_gluten_free,
                diet_dairy_free,
                diet_ketogenic,
                diet_whole_thirty,
                use_metric,
                people_to_prep_for,
                meals_per_week)
              VALUES (
                '${req.query.id}',
                ${req.query.egg},
                ${req.query.grain},
                ${req.query.peanut},
                ${req.query.seafood},
                ${req.query.shellfish},
                ${req.query.sesame},
                ${req.query.soy},
                ${req.query.sulfite},
                ${req.query.treeNut},
                ${req.query.wheat},
                ${req.query.vegetarian},
                ${req.query.vegan},
                ${req.query.glutenFree},
                ${req.query.dairyFree},
                ${req.query.keto},
                ${req.query.wholeThirty},
                ${req.query.metric},
                ${req.query.numPeople},
                ${req.query.numMeals});`, (err, rows, fields) => {

    if (err) console.log(err);

    res.status(201).send('success');
  });
});

//update user preferences

app.get('/adjustpreferences', (req, res) => {
  pool.query(`UPDATE Preferences SET
                allergy_egg = ${req.query.egg},
                allergy_grain = ${req.query.grain},
                allergy_peanut = ${req.query.peanut},
                allergy_seafood = ${req.query.seafood},
                allergy_shellfish = ${req.query.shellfish},
                allergy_sesame = ${req.query.sesame},
                allergy_soy = ${req.query.soy},
                allergy_sulfite = ${req.query.sulfite},
                allergy_tree_nut = ${req.query.treeNut},
                allergy_wheat = ${req.query.wheat},
                diet_vegetarian = ${req.query.vegetarian},
                diet_vegan = ${req.query.vegan},
                diet_gluten_free = ${req.query.glutenFree},
                diet_dairy_free = ${req.query.dairyFree},
                diet_ketogenic = ${req.query.keto},
                diet_whole_thirty = ${req.query.wholeThirty},
                use_metric = ${req.query.metric},
                people_to_prep_for = ${req.query.numPeople},
                meals_per_week = ${req.query.numMeals}
              WHERE user_id = '${req.query.id}';`, (err, rows, fields) => {
    if (err) console.log(err);

    res.status(200).send(rows);
  });
});

//get recipe list

app.get('/getrecipes', (req, res) => {
  pool.query(`SELECT * FROM Recipes;`, (err, rows, fields) => {
    if (err) console.log(err);

    res.status(200).send(rows);
  });
});

//get recipe by ID

app.get('/menuitems')
//get ingredients

app.get('/getingredients', (req, res) => {
  pool.query(`SELECT * FROM Ingredients;`, (err, rows, fields) => {
    if (err) console.log(err);

    res.status(200).send(rows);
  });
});

//add banned ingredients for user

app.get('/bannedingredients', (req, res) => {
  pool.query(`INSERT INTO Banned_Ingredients (user_id, name) VALUES ('${req.query.user_id}', ${req.query.name}');`, (err, rows, fields) => {
    if (err) console.log(err);

    res.status(200).send(rows);
  });
});

//get user menu items and favorite items by user id

app.get('/menuitems', (req, res) => {
  pool.query(`SELECT Recipes.*,Users_Recipes.is_saved,Users_Recipes.is_favorited,Users_Recipes.is_on_menu,Cooking_Instructions.*, Ingredients.* FROM Recipes, Users_Recipes, Cooking_Instructions, Ingredients  WHERE users_recipes.user_id = '${req.query.id}';`, (err, rows, fields) => {
    if (err) console.log(err);
    console.log(rows)
    res.status(200).send(rows);
  });
});



//SEARCH API route
app.get('/searchrecipes', async (req, res) => {
    let recipesData = [];
    await axios({
      "method":"GET",
      "url":"https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search",
      "headers":{
        "content-type":"application/octet-stream",
        "x-rapidapi-host":"spoonacular-recipe-food-nutrition-v1.p.rapidapi.com", //api Host domain through rapidAPI
        "x-rapidapi-key":spoonAPIKey                                    //api Key Spoonacular set to a config file in Root DIR (gitignored)
      },"params":{
        "diet": req.query.diet,
        "excludeIngredients":req.query.banList,
        "intolerances":req.query.allergenList,
        "number":"20",
        "offset":"0",
        "instructionsRequired":"true",
        "query":req.query.searchInput
      }
    }).then(res => {
      recipesData = res.data.results;
    })
    .catch(err => {
      console.log(err);
      res.status(404).send({error: err});
    });
    await res.status(200).send(recipesData);
});
       
    //const recipeIDs = await recipesSearched.body.results.map(recipe => recipe.id);
    // const recipesInfoBulk = await axios({
    //   "method":"GET",
    //   "url":"https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/informationBulk",
    //   "headers":{
    //     "content-type":"application/octet-stream",
    //     "x-rapidapi-host":"spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    //     "x-rapidapi-key":spoonAPIKey
    //     },"params":{
    //       "ids":recipeIDs.join()
    //     }
    // });

//Add new routes above
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  });
});

app.listen(port, () => console.log(`listening from port: ${port}`));