/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Users', {
    id: {
      type: DataTypes.STRING(64),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    portions_per_week: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    portions_fulfilled: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'Users'
  });
};
