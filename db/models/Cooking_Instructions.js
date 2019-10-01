/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Cooking_Instructions', {
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
    step_number: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    step: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'Cooking_Instructions'
  });
};
