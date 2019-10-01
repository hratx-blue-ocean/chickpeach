/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Recipes', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    nutrient_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'nutrients',
        key: 'id'
      }
    },
    servings: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    prep_time: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'Recipes'
  });
};
