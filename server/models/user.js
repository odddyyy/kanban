'use strict';

const { hashing } = require(`../helpers/bcrypt`)

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty:{
          msg:`Name cannot be empty`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty:{
          msg:`Email cannot be empty`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty:{
          msg:`Password cannot be empty`
        }
      }
    }
  }, {
    hooks:{
      beforeCreate: (instance, option) => {
        return hashing(instance.password)
        .then(data => {
          instance.password = data
        })
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};