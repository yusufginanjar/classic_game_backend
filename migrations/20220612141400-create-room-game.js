'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('room_games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      room_code: {
        type: Sequelize.INTEGER
      },
      game_name: {
        type: Sequelize.STRING
      },
      player_1: {
        type: Sequelize.INTEGER,
        allowNull: true, 
      },
      player_2: {
        type: Sequelize.INTEGER,
        allowNull: true, 
      },
      player_1_pick: {
        type: Sequelize.STRING,
        allowNull: true, 
        get() {
          return this.getDataValue('player_1_pick').split(';')
        },
        set(val) {
          this.setDataValue('player_1_pick',val.join(';'));
        },
      },
      player_2_pick: {
        type: Sequelize.STRING,
        allowNull: true, 
        get() {
          return this.getDataValue('player_2_pick').split(';')
        },
        set(val) {
          this.setDataValue('player_2_pick',val.join(';'));
        },
      },
      winner: {
        type: Sequelize.STRING,
        allowNull: true, 
      },
      approved: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('room_games');
  }
};