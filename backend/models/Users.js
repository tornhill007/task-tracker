const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');


const Users = db.define('users', {
        userid: {
            type: DataTypes.UUID,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        timestamps: false,
        tableName: 'users'
    })

module.exports = Users;
