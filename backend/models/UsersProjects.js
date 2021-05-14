const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');


const UsersProjects = db.define('usersprojects', {
        id: {
            type: DataTypes.UUID,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        projectid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
        timestamps: false,
        tableName: 'usersprojects'
    })

module.exports = UsersProjects;
