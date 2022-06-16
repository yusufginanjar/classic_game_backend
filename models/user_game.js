const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

'use strict';
const {
  Model
} = require('sequelize');



module.exports = (sequelize, DataTypes) => {
  class User_game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    /* Method .compareSync digunakan untuk mencocokkan plaintext dengan hash. */
    checkPassword(password) {
      return bcrypt.compareSync(password, this.password)
    } 

    generateToken() {
      // Jangan memasukkan password ke dalam payload
      const payload = {
      id: this.id,
      username: this.username
      }
      // Rahasia ini nantinya kita pakai untuk memverifikasi apakah token ini benar-benar berasal dari aplikasi kita
      const rahasia = 'sECRETr'
      // Membuat token dari data-data diatas
      const token = jwt.sign(payload, rahasia)
      return token
    }


      /* Method Authenticate, untuk login */
    static async authenticate({ username, password }) {
      try {
        const user = await this.findOne({ where: { username }})
      if (!user) return Promise.reject("User not found!")
        const isPasswordValid = user.checkPassword(password)
      if (!isPasswordValid) return Promise.reject("Wrong password")
        return Promise.resolve(user)
      }
      catch(err) {
        return Promise.reject(err)
      }
    }
  }
  User_game.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    fullname: DataTypes.STRING,
    approved: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User_game',
  });
  return User_game;
};