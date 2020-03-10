'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty:{
          msg:`Title cannot be empty`
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty:{
          msg:`Description cannot be empty`
        }
      }
    },
    status: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    hooks:{
      beforeCreate: (instance, option) => {
        if (!instance.status) {
          instance.status = `Backlog`
        }
      }
    }
  });
  Task.associate = function(models) {
    // associations can be defined here
  };
  return Task;
};