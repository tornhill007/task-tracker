const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');


const Registration = db.define('registration', {
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
        tableName: 'registration'
    })

module.exports = Registration;
