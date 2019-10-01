const Sequelize = require('sequelize');

var db = {};

const sequelize = new Sequelize(
    'chickpeach',
    'root',
    'password',
    {
        host: 'http://localhost',
        port: '3306',
        dialect: 'mysql',
        define: {
            freezeTableName: true,
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        // <http://docs.sequelizejs.com/manual/tutorial/querying.html#operators>
        operatorsAliases: false,
    },
);

let models = [
    require('./models/Banned_Ingredients.js'),
    require('./models/Cooking_Instructions.js'),
    require('./models/Ingredients.js'),
    require('./models/Nutrients.js'),
    require('./models/Recipes_Ingredients.js'),
    require('./models/Recipes.js'),
    require('./models/Users_Recipes.js'),
    require('./models/Users.js')
]

// Initialize models
models.forEach(model => {
    const seqModel = model(sequelize, Sequelize)
    db[seqModel.name] = seqModel
});

// Apply associations
Object.keys(db).forEach(key => {
    if ('associate' in db[key]) {
        db[key].associate(db)
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;