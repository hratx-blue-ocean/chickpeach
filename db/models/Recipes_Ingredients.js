/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Recipes_Ingredients', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    recipe_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'Recipes',
        key: 'id'
      }
    },
    ingredient_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'Ingredients',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    unit: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'Recipes_Ingredients'
  });
};
