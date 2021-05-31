const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');
const UsersProjects = require('./UsersProjects')
const Users = require('./Users');


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

Projects.buildProjectByName = function (name) {
    return this.build({name});
}

Projects.updateProjectNameByProjectId = function (id) {
    return this.findOne({where: {projectid: id}});
}

Projects.getProjectByProjectId = function (projectid) {
    return this.findOne({where: {projectid}});
}

Projects.getAllProjectsUsers = function (userid) {
    return this.findAll({
            include: [{
                model: Users,
                as: 'users',
                required: true,
                where: {
                    userid
                }
            }
            ]
        }
    );
}

module.exports = Projects;
