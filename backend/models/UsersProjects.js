const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');
const Projects = require('./Projects');
const Users = require('./Users');


const UsersProjects = db.define('usersprojects', {
        id: {
            type: DataTypes.UUID,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        projectid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        tableName: 'usersprojects'
    })

UsersProjects.buildUsersProject = function (projectid, userid) {
    return this.build({projectid, userid});
}

UsersProjects.destroyUsersProjectsByProjectId = function (projectid) {
    return this.destroy({where: { projectid }});
}

UsersProjects.getUsersProjects = function (projectid, userid) {
    return this.findOne({where: { projectid, userid }});
}

UsersProjects.getAllUsersProjectsByProjectId = function (projectid) {
    return this.findAll({where: { projectid }});
}





module.exports = UsersProjects;
