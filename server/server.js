const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const mysql = require('mysql2');
const axios = require('axios');
const bodyParser = require('body-parser');

// const { spoonAPIKey } = require('./spoonAPI.config.js');

// const pool = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'password',
//   database: 'chickpeach',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

app.use(express.static('dist'));
app.use(bodyParser.json());

//add user to database

app.get('/register', (req, res) => {
  pool.query(`INSERT INTO Users (id, name, people_to_prep_for, portions_per_week, portions_fulfilled) VALUES ("${req.query.id}", "${req.query.name}", 0,0, 0);`, (err, rows, fields) => {
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
  pool.query(`SELECT * FROM Preferences where id = '${req.query.id}';`, (err, rows, fields) => {
    if (err) console.log(err);

    res.status(200).send(rows);
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
                use_metric = ${req.query.metric}
              WHERE user_id = '${req.query.id}';`, (err, rows, fields) => {
    if (err) console.log(err);

    res.status(200).send(rows);
  });
});

//get banned ingredients by user id

app.get('/bannedingredients', (req, res) => {
  pool.query(`INSERT INTO Banned_Ingredients (user_id, name) VALUES ('${req.query.user_id}', ${req.query.name}');`, (err, rows, fields) => {
    if (err) console.log(err);

    res.status(200).send(rows);
  });
});

//get user menu items and favorite items by user id

app.get('/menuitems', (req, res) => {
  pool.query(`SELECT * FROM Users_Recipes WHERE user_id = '${req.query.user_id}' AND (is_on_menu = 1 OR is_favorited = 1);`, (err, rows, fields) => {
    if (err) console.log(err);

    res.status(200).send(rows);
  });
});

//SEARCH API route
app.get('/searchRecipes', async (req, res) => {
  try {
    let recipesData = {}; 
    const recipesSearched = await axios({
      "method":"GET",
      "url":"https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search",
      "headers":{
        "content-type":"application/octet-stream",
        "x-rapidapi-host":"spoonacular-recipe-food-nutrition-v1.p.rapidapi.com", //api Host domain through rapidAPI
        "x-rapidapi-key":spoonAPIKey                                    //api Key Spoonacular set to a config file in root DIR (gitignored)
      },"params":{
        "diet": req.query.diet,
        "excludeIngredients":req.query.banList,
        "intolerances":req.query.allergenList,
        "number":"20",
        "offset":"0",
        "instructionsRequired":"true",
        "query":req.query.searchInput
      }
    });
    
    recipesData.results = await recipesSearched.body.results.map(recipe => {
      delete recipe['imageUrls'];
      return recipe;
    });
    
    res.send(recipesData).status(200);
    
  } catch(err) {
    console.log(err);
  }
  
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