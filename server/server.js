require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const axios = require('axios');
const bodyParser = require('body-parser');
const passRDS = require('../AWS.RDS.config.js');
const { spoonAPIKey } = require('../spoonAPI.config.js');
const mysql = require('mysql2');
const { getNestedObject, allowCrossDomain, asyncForEach, checkNutritionData } = require('./utils.js');


const pool = mysql.createConnection({
  host: 'chickpeach.crlbgpq4n5lp.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: passRDS,
  database: 'chickpeach',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.use(express.static('dist'));
app.use(bodyParser.json());
app.use(allowCrossDomain);

//add user to database

app.get('/register', (req, res) => {

  pool.query(`INSERT INTO Users (id, name) VALUES ("${req.query.id}", "${req.query.name}");`, (err, rows, fields) => {
    if (err) {
      console.error(err);
    } else {
      res.status(201).send('success');
    }
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
        diet: row.diet,
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
        gluten: !!row.allergy_gluten,
        dairy: !!row.allergy_dairy,
        peopleToPrepFor: row.people_to_prep_for,
        addedAllergies: [], //**replace with an array of allergies
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
                allergy_gluten,
                allergy_dairy,
                diet,
                people_to_prep_for,
                meals_per_week
                )
              VALUES (
                '${req.query.uid}',
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
                '',
                0,
                0);`), (err, rows, fields) => {

    if (err) console.log(err);

    res.status(201).send('success');
  }
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
                allergy_gluten = ${req.query.gluten},
                allergy_dairy = ${req.query.dairy},
                diet = '${req.query.diet}',
                people_to_prep_for = ${req.query.peopleToPrepFor},
                meals_per_week = ${req.query.numberOfMeals}
              WHERE user_id = '${req.query.user_id}';`, (err, rows, fields) => {
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

//get ingredients

app.get('/getingredients', (req, res) => {
  let query = '';

  req.query.recipes.forEach( recipe => {
    query += ` recipe_id = ${recipe} OR `;
  });

  query = query.substring(0, query.length - 4);

  pool.query(`SELECT * FROM Ingredients WHERE ${query};`, (err, rows, fields) => {
    if (err) console.log(err);

    res.status(200).send(rows);
  });
});

//add banned ingredients for user

app.post('/addbannedingredients', (req, res) => {
  //req.query.arrayOfAllergies has the array

  pool.query(`INSERT INTO Banned_Ingredients (user_id, name) VALUES ('${req.query.user_id}', '${req.query.ingredients}');`, (err, rows, fields) => {
    if (err) console.log(err);

    res.status(200).send(rows);
  });
});

//get user's banned ingredients 

app.get('/getbannedingredients', (req, res) => {

  pool.query(`SELECT * FROM Banned_Ingredients WHERE user_id = '${req.query.user_id};`, (err, rows, fields) => {
    if (err) console.log(err);

    res.status(200).send(rows);
  });
});

//update user's banned ingredients

app.put('/updatebannedingredients', (req, res) => {
  
  pool.query(`UPDATE Banned_Ingredients SET name = ${req.query.ingredients} WHERE user_id = '${req.query.user_id}';`, (err, res) => {
    if (err) console.log(err);

    res.status(201).send();
  });
});

//get user menu items by user id

app.get('/menuitems', (req, res) => {
  pool.query(`SELECT Recipes.id,Recipes.title,Recipes.image,Recipes.servings FROM Recipes, Users_Recipes WHERE Recipes.id = Users_Recipes.recipe_id AND Users_Recipes.user_id = '${req.query.user_id}' AND is_on_menu = 1 ORDER BY Users_Recipes.recipe_id DESC;`, (err, rows, fields) => {
    if (err) console.log(err);
    res.status(200).send(rows);
  });
});

//add saved item to user menu

app.put('/addtomenu', (req, res) => {
  pool.query(`SELECT * from Users_Recipes WHERE user_id = '${req.body.user_id}' AND recipe_id = ${+req.body.recipe_id} AND is_on_menu = 1`, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else if (rows.length) {
      res.send('already on menu');
    } else {
      pool.query(`UPDATE Users_Recipes SET is_on_menu = 1 WHERE user_id = '${req.body.user_id}' AND recipe_id = ${+req.body.recipe_id};`, (err, rows, fields) => {
        if (err) {
          console.log(err)
          res.status(404).send(err);
        }
        res.status(200).end('success');
      });
    }
  });
});

//remove menu item by user id and recipe id

app.put('/removemenuitem', (req, res) => {
  pool.query(`UPDATE Users_Recipes SET is_on_menu = 0 WHERE user_id = '${req.body.user_id}' AND recipe_id = ${+req.body.recipe_id};`, (err, rows, fields) => {
    if (err) {
      console.log(err)
      res.status(404).send(err);
    }
    res.status(200).end('success');
  });
});

//add saved item to user favorites

app.put('/addtofavorites', (req, res) => {
  pool.query(`SELECT * from Users_Recipes WHERE user_id = '${req.body.user_id}' AND recipe_id = ${+req.body.recipe_id} AND is_favorited = 1`, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else if (rows.length) {
      res.send('already on favorites');
    } else {
      pool.query(`UPDATE Users_Recipes SET is_favorited = 1 WHERE user_id = '${req.body.user_id}' AND recipe_id = ${+req.body.recipe_id};`, (err, rows, fields) => {
        if (err) {
          console.log(err)
          res.status(404).send(err);
        }
        res.status(200).end('success');
      });
    }
  });
});

//remove user favorited items by user id and recipe id

app.put('/removefromfavorites', (req, res) => {
  pool.query(`UPDATE Users_Recipes SET is_favorited = 0 WHERE user_id = '${req.body.user_id}' AND recipe_id = ${+req.body.recipe_id};`, (err, rows, fields) => {
    if (err) {
      console.log(err)
      res.status(404).send(err);
    }
    res.status(200).end('success');
  });
});

//remove items from user history

app.put('/removefromhistory', (req, res) => {
  pool.query(`UPDATE Users_Recipes SET is_saved = 0 WHERE user_id = '${req.body.user_id}' AND recipe_id = ${+req.body.recipe_id};`, (err, rows, fields) => {
    if (err) {
      console.log(err)
      res.status(404).send(err);
    }
    res.status(200).end('success');
  });
});

//get user favorited items by user id

app.get('/favoriteitems', (req, res) => {
  pool.query(`SELECT Recipes.id,Recipes.title,Recipes.image,Recipes.servings FROM Recipes, Users_Recipes WHERE recipes.id = Users_Recipes.recipe_id AND Users_Recipes.user_id = '${req.query.user_id}' AND is_favorited = 1;`, (err, rows, fields) => {
    if (err) console.log(err);
    res.status(200).send(rows);
  });
});

//get saved items by user id

app.get('/saveditems', (req, res) => {
  pool.query(`SELECT Recipes.id,Recipes.title,Recipes.image,Recipes.servings FROM Recipes, Users_Recipes WHERE Recipes.id = Users_Recipes.recipe_id AND Users_Recipes.user_id = '${req.query.user_id}' AND is_saved = 1;`, (err, rows, fields) => {
    if (err) console.log(err);
    res.status(200).send(rows);
  });
});

//remove user saved item by user id and recipe id

app.get('/removesaveditems', (req, res) => {
  pool.query(`UPDATE Users_Recipe SET is_saved = 0 WHERE user_id = ${req.query.userId} AND recipe_id = ${req.query.recipeId}`, (err, rows, fields) => {
    if (err) console.log(err);
    res.status(200).send();
  });
});

//SEARCH API route
app.get('/searchrecipes', async (req, res) => {
    let recipesData = [];

    const getIntolerances = (obj) => {
      const allergyList = [];
      for (let key in obj) {
        if(obj[key] === true) {
          allergyList.push(key);
        }
      }
      return allergyList.join(', ');
    }
    
    const intolerances = getIntolerances(JSON.parse(req.query.allergenList));

    const banned = req.query.banList.join(',');

    await axios({
      "method":"GET",
      "url":"https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search",
      "headers":{
        "content-type":"application/octet-stream",
        "x-rapidapi-host":"spoonacular-recipe-food-nutrition-v1.p.rapidapi.com", //api Host domain through rapidAPI
        "x-rapidapi-key":spoonAPIKey                                    //api Key Spoonacular set to a config file in Root DIR (gitignored)
      },"params":{
        "diet": req.query.diet,
        "excludeIngredients": banned,
        "intolerances": intolerances,
        "number":"20",
        "offset":"0",
        "instructionsRequired":"true",
        "query":req.query.searchInput
      }
    }).then(res => {
      recipesData = res.data.results.map(recipe => {
        recipe['absoluteImageURL'] = `${res.data.baseUri} + ${recipe.image}`;
        return recipe;
      });
    })
    .catch(err => {
      console.log(err);
      res.status(404).send({error: err});
    });
    await res.status(200).send(recipesData);
});

//get single recipe from database
app.get('/getsingledbrecipe', (req, res) => {
  let recipeID = req.query.recipeID;
  let obj = {};

  pool.query(`SELECT*FROM recipes WHERE ID = ${recipeID}`, (err, rows, fields) => {
    let recipe = rows[0];

    obj['id'] = recipe.id;
    obj['title'] = recipe.title;
    obj['image'] = recipe.image;
    obj['servings'] = recipe.servings;
    obj['prep_time'] = recipe.prep_time;
    obj['created_by_user'] = recipe.created_by_user;
    obj['nutrition_info'] = [
      { title: 'Calories',
        amount: +recipe.calories,
        unit: 'cal' },
      { title: 'Carbohydrates',
        amount: +recipe.carbs, 
        unit: 'g' },
      { title: 'Fat',
        amount: +recipe.fat,
        unit: 'g' },
      { title: 'Fiber',
        amount: +recipe.fiber,
        unit: 'g' },
      { title: 'Protein',
        amount: +recipe.protein,
        unit: 'g' },
      { title: 'Sodium',
        amount: +recipe.sodium,
        unit: 'mg' },
      { title: 'Sugar',
        amount: +recipe.sugar,
        unit: 'g' }
    ];

    pool.query(`SELECT*FROM cooking_instructions WHERE recipe_ID = ${recipeID}`, (err, rows, fields) => {
      let steps = [];

      rows.forEach(step => {
        steps.push(step.step)
      });

      obj['directions'] = steps;

      pool.query(`SELECT*FROM Ingredients WHERE recipe_id = ${recipeID}`, (err, rows, fields) => {
        obj['ingredients'] = rows.map( ing => {
          let ingredient = {};

          ingredient['aisle'] = ing.aisle;
          ingredient['name'] = ing.name;
          ingredient['quantity'] = ing.quantity;
          ingredient['stringRender'] = `${ing.quantity} ${ing.unit} ${ing.name}`;
          ingredient['unit'] = ing.unit;

          return ingredient;
        });

        res.status(200).send(obj);
      });
    });
  });
});


//Get Single Recipe Info route by local db MySQL and by SpoonAPI
app.get('/getSingleRecipe', async (req, res) => {
  const recipeID = req.query.recipeID;
  let recipeData = {};
  await axios({
    "method":"GET",
    "url":`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeID}/information`,
    "headers":{
    "content-type":"application/octet-stream",
    "x-rapidapi-host":"spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    "x-rapidapi-key":spoonAPIKey
    },"params":{
    "includeNutrition":"true"
    }
  }).then(res => {
    recipeData["recipeID"] = res.data.id;
    recipeData["title"] = res.data.title;
    recipeData["image"] = res.data.image;
    recipeData["servings"] = res.data.servings;
    recipeData["prep_time"] = res.data.readyInMinutes;
    recipeData["ingredients"] = res.data.extendedIngredients.map(ing => {
      let ingredient = {};  
      ingredient["stringRender"] = ing.original;
      ingredient["quantity"] = ing.amount;
      ingredient["unit"] = ing.unit;
      ingredient["name"] = ing.name;
      ingredient["aisle"] = ing.aisle;
      return ingredient;
    });
    recipeData["nutrition_info"] = res.data.nutrition.nutrients;
    recipeData["directions"] = res.data.analyzedInstructions[0].steps.map(stepObj => stepObj.step);
   })
   .catch(err => {
     console.log(err);
     res.status(404).send({error: err});
   });
   await res.status(200).send(recipeData);
  }
);

//POST singleRecipe from API result route
<<<<<<< HEAD
app.post('/addrecipe', (req, res) => {
  const postAction = req.body.params.action ? req.body.params.action : 'menu';
  console.log(req.body.params.action);
  
  //NutritionData Validation
  const nutrients = checkNutritionData(req);

  //INSERT Recipe and return Recipe UID in SQL DB
  pool.query(`REPLACE INTO recipes (title, image, servings, prep_time, calories, carbs, fat, fiber, protein, sodium, sugar) VALUES ("${req.body.data.title}", "${req.body.data.image}", ${req.body.data.servings}, ${req.body.data.prep_time}, ${nutrients.Calories}, '${nutrients.Carbohydrates}', '${nutrients.Fat}', '${nutrients.Fiber}', '${nutrients.Protein}', '${nutrients.Sodium}', '${nutrients.Sugar}');`, (err, results, fields) => {
    const recipe_id = results.insertId;
    if (err) {
      console.log(err);
    } else {
      let u_rInsert = `INSERT INTO users_recipes (recipe_id, user_id) VALUES (${recipe_id}, '${req.body.params.user}');`;
      pool.query(`SELECT * FROM users_recipes WHERE recipe_id = ${recipe_id} AND user_id = '${req.body.params.user}';`, (err, results, fields) => {
        const user = req.body.params.user;
        if (results.length === 0) {
          pool.query(u_rInsert, (err, results, fields) => {
            if (err) {
              console.log(err);
            } else {
              console.log('INSERT users_recipes record: ' + results + 'fields meta: ' + fields);
            }
          });
        }
        if (postAction === 'menu') {
          pool.query(`UPDATE users_recipes SET is_on_menu = 1 WHERE recipe_id = ${recipe_id} AND user_id = '${user}';`, (err, results, fields) => {
            if (err) {
              console.log(err);
            } else {
              console.log('UPDATE users_recipes record is_on_menu: ' + results);
            }
          });
        } else {
          pool.query(`UPDATE users_recipes SET is_favorited = 1 WHERE recipe_id = ${recipe_id} AND user_id = '${user}';`, (err, results, fields) => {
            if (err) {
              console.log(err);
            } else {
              console.log('UPDATE users_recipes record is_favorited: ' + results);
            }
          });
        }
      });
    }
    //mapping async insert collection of ingredients 
    asyncForEach(req.body.data.ingredients, async (ing) => {
      pool.query(`INSERT INTO ingredients (name, quantity, unit, aisle, recipe_id) VALUES ("${ing.name}", "${ing.quantity}", "${ing.unit}", "${ing.aisle}", ${recipe_id});`, (err, results, fields) => {
        if (err) {
          console.log(err);
        } else {
          console.log('INSERT ingredient: ' + results);
        }
      });
  
    });
    //mapping async insert collection of instructions
    asyncForEach(req.body.data.directions, async (inst, idx) => {
      pool.query(`INSERT INTO cooking_instructions (step, step_number, recipe_id) VALUES (${JSON.stringify(inst)}, ${idx + 1}, ${recipe_id});`, (err, results, fields) => {
        if (err) {
          console.log(err);
        } else {
          console.log('INSERT instruction: ' + results);
        }
      });
    });
  });
  
  res.status(201).send('');
});
=======
// app.post('/addrecipe', async (req, res) => {
//   const postAction = req.query.action ? req.query.action : 'menu';
  
  
//   //INSERT Recipe and return Recipe UID in SQL DB
//   const [recipe_id] = await pool.query(`REPLACE INTO recipes (title, image, servings, prep_time, calories, carbs, fat, fiber, protein, sodium, sugar) VALUES ('${req.body.title}', '${req.body.image}', '${req.body.servings}', '${req.body.prep_time}', '${req.body.calories}', '${req.body.carbs}', '${req.body.fat}', '${req.body.fiber}', '${req.body.protein}', '${req.body.sodium}', '${req.body.sugar}');`, (err, results, fields) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('InsertedROW ID recipes: ' + results.insertId);
//     }
//   });
  
//   //Checking for user_recipe record duplicate
//   const u_rInsert = `INSERT INTO users_recipes (recipe_id, user_id) VALUES (${recipe_id}, '${req.query.user}');`;
//   await pool.query(`SELECT * FROM users_recipes WHERE recipe_id = ${recipe_id} AND user_id = '${req.query.user}';`, (err, results, fields) => {
//     if (!results) {
//       await pool.query(u_rInsert, (err, results, fields) => {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log('INSERT users_recipes record: ' + results + 'fields meta: ' + fields);
//         }
//       });
//     }
//     if (postAction === 'menu') {
//       await pool.query(`UPDATE users_recipes SET is_on_menu = 1 WHERE recipe_id = ${recipe_id} AND user_id = '${req.query.user}';`, (err, results, fields) => {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log('UPDATE users_recipes record is_on_menu: ' + results);
//         }
//       });
//     } else {
//       await pool.query(`UPDATE users_recipes SET is_favorited = 1 WHERE recipe_id = ${recipe_id} AND user_id = '${req.query.user}';`, (err, results, fields) => {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log('UPDATE users_recipes record is_favorited: ' + results);
//         }
//       });
//     }
//   });
  
//   //mapping async insert collection of ingredients 
//   asyncForEach(req.body.ingredients, async (ing) => {
//     await pool.query(`INSERT INTO ingredients (name, quantity, unit, aisle, recipe_id) VALUES ('${ing.name}', '${ing.quantity}', '${ing.unit}', '${ing.aisle}', ${recipe_id});`, (err, results, fields) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log('INSERT ingredient: ' + results);
//       }
//     });

//   });
//   //mapping async insert collection of instructions
//   asyncForEach(req.body.instructions, async (inst, idx) => {
//     await pool.query(`INSERT INTO cooking_instructions (step, step_number, recipe_id) VALUES ('${inst}', ${idx + 1}, ${recipe_id});`, (err, results, fields) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log('INSERT instruction: ' + results);
//       }
//     });

//   });
//   res.status(201).send(recipe_id);
// });
>>>>>>> Comment out buggy server POST request line 380

/* example Axios POST request
  for singleRecipeFromAPI

  axios({
    method: 'post',
    url: '/addrecipe',
    params: {
      action: 'menu' or 'fave'
      user: uid
    },
    data: recipeData
  });

*/


//Add new routes above
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(port, () => console.log(`listening from port: ${port}`));  