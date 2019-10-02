const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const mysql = require('mysql2');
const axios = require('axios');
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

    const recipesSearched = await axios({
      "method":"GET",
      "url":"https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search",
      "headers":{
        "content-type":"application/octet-stream",
        "x-rapidapi-host":"spoonacular-recipe-food-nutrition-v1.p.rapidapi.com", //api Host domain
        "x-rapidapi-key":spoonAPIKey                                    //api Key Spoonacular set to a config file in server DIR (gitignored)
      },"params":{
        "diet":`${req.query.diet}`,
        "excludeIngredients":`${req.query.banList}`,
        "intolerances":`${req.query.allergenList}`,
        "number":"20",
        "offset":"0",
        "instructionsRequired":"true",
        "query":`${req.query.searchInput}`
      }
    });
    const recipeIDs = await recipesSearched.body.results.map(x => x.id);
  

    const recipesInfoBulk = await axios({
      "method":"GET",
      "url":"https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/informationBulk",
      "headers":{
        "content-type":"application/octet-stream",
        "x-rapidapi-host":"spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key":"b0d836b685msh81f6d3578b838a3p1a8c04jsnd9beb282b2d9"
        },"params":{
          "ids":recipeIDs.join()
        }
    });
    res.send(recipesInfoBulk).status(200);
  } catch(err) {
    console.log(err);
  }
    // .then((response)=>{
    //   console.log(response)
    // })
    // .catch((error)=>{
    //   console.log(error)
    // })
});

//Add new routes above
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  });
});

app.listen(port, () => console.log(`listening from port: ${port}`));