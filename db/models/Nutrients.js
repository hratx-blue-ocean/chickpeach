/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Nutrients', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    calories: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    carbs: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fat: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fiber: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    protein: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    sodium: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    sugar: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'Nutrients'
  });
};
