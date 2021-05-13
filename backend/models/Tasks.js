const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');


const Tasks = db.define('tasks', {
        taskid: {
            type: DataTypes.UUID,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        taskname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        users: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true
        },
        markers: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true
        },
        columnid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        projectid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        position: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    },
    {
        timestamps: false
    })

module.exports = Tasks;
