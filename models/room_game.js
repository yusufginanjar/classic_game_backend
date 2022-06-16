'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class room_game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  room_game.init({
    room_code: DataTypes.INTEGER,
    game_name: DataTypes.STRING,
    player_1: DataTypes.INTEGER,
    player_2: DataTypes.INTEGER,
    player_1_pick: {
      type: DataTypes.STRING,
      // get() {
      //   return this.getDataValue('player_1_pick').split(';')
      // },
      // set(val) {
      //   this.setDataValue('player_1_pick',hash(val));
      // },
    },
    player_2_pick: {
      type: DataTypes.STRING,
      // get() {
      //   return this.getDataValue('player_2_pick').split(';')
      // },
      // set(val) {
      //   this.setDataValue('player_2_pick', hash(val));
      // },
    },
    winner: DataTypes.STRING,
    approved: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'room_game',
  });
  return room_game;
};