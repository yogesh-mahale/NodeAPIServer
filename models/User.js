const Sequelize = require('sequelize');
const db = require('../config/database');

const User = db.define('User', {
    // Model attributes are defined here
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'username'
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'email'
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'password'
    },
    address: {
        type: Sequelize.STRING,
        allowNull: true
    },
    mobile: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    companies: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    isAdmin: {
        type: Sequelize.INTEGER,
        allowNull: true,
    }
}, {
    // Other model options go here
    tableName: 'user'
});

module.exports = User;