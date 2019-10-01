const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
// const mysql = require('mysql2');

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
  pool.query(`INSERT INTO Users (id, name, portions_per_week, portions_fulfilled, vegetarian, vegan, gluten_free, dairy_free, ketogenic, whole_thirty, people_to_prep_for, use_metric) VALUES ("${req.query.id}", "${req.query.name}", ${req.query.vegetarian}, ${req.query.vegan}, ${req.query.glutenFree}, ${req.query.dairyFree}, ${req.query.ketogenic}, ${req.query.wholeThirty}, ${req.query.numPeople}, ${req.query.metric});`, (err, rows, fields) => {
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

//Add new routes above
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  });
});

app.listen(port, () => console.log(`listening from port: ${port}`));