const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const mysql = require('mysql2');
const axios = require('axios');

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

//add user

app.get('/register', (req, res) => {
  pool.query(`INSERT INTO Users (id, name, portions_per_week, portions_fulfilled) VALUES ("${req.query.id}", "${req.query.name}", 0, 0);`, (err, rows, fields) => {
    if (err) console.log(err);

    res.status(201).send('success');
  });
});

//get user

app.get('/user', (req, res) => {
  pool.query(`SELECT * FROM Users`, (err, rows, fields) => {
    if (err) console.log(err);

    res.status(200).send(rows);
  });
});

//get banned ingredients

app.get('/bannedingredients', (req, res) => {
  pool.query(`SELECT * FROM Banned_Ingredients WHERE user_id = '${req.query.user_id}'`, (err, rows, fields) => {
    if (err) console.log(err);

    res.status(200).send(rows);
  })
});

//get user menu items

app.get('/menuitems', (req, res) => {
  pool.query(`SELECT * FROM Users_Recipes WHERE user_id = '${req.query.user_id}, is_on_menu = 1'`, (err, rows, fields) => {
    if (err) console.log(err);

    res.status(200).send(rows);
  })
});

//get user favorites

app.get('/menuitems', (req, res) => {
  pool.query(`SELECT * FROM Users_Recipes WHERE user_id = '${req.query.user_id}, is_favorited = 1'`, (err, rows, fields) => {
    if (err) console.log(err);

    res.status(200).send(rows);
  })
});

//SEARCH API route
app.get('/searchRecipes', (req, res) => {
  
});

//Add new routes above
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.listen(port, () => console.log(`listening from port: ${port}`));