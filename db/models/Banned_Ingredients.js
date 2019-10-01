/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Banned_Ingredients', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.STRING(64),
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'Banned_Ingredients'
  });
};
