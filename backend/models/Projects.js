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

    },
    {
        timestamps: false,
        tableName: 'projectslist'
    })

module.exports = Projects;
