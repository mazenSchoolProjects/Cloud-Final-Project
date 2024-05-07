const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('college', 'root', 'root', {
    dialect: 'mysql',
    host: 'db',
});


/*
 
    * Admin model
    * id Integer
    * name String
    * username String
    * password String
 
*/
const Admin = sequelize.define('Admin', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'admin'
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'admin'
    },
    password: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'admin'
    }
}, {
    tableName: 'admins',
    timestamps: false
});

module.exports = Admin;
