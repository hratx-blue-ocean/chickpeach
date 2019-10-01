/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Users_Recipes', {
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
    recipe_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'Recipes',
        key: 'id'
      }
    },
    is_saved: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    is_favorited: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    is_on_menu: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    created_by: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'Users_Recipes'
  });
};
