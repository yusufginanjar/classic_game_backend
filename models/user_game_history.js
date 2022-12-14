'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_game_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User_game_history.init({
    user_id: DataTypes.INTEGER,
    room_game_id: DataTypes.INTEGER,
    game_name: DataTypes.STRING,
    total_played: DataTypes.INTEGER,
    win: DataTypes.INTEGER,
    draw: DataTypes.INTEGER,
    lose: DataTypes.INTEGER,
    approved: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User_game_history',
  });
  return User_game_history;
};