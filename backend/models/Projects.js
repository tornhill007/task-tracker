const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');


const Projects = db.define('projectslist', {
        projectid: {
            type: DataTypes.UUID,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            field: 'createdat',
            type: Sequelize.DATE,
        },
        updatedAt: {
            field: 'updatedat',
            type: Sequelize.DATE,
        },
    },
    {
        tableName: 'projectslist'
    })

module.exports = Projects;
