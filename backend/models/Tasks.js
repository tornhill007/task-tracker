const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');
const Users = require('./Users');

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
        // classMethods: {
        //     async getTasksBuyProjectId(id) {
        //         return await this.findAll({where: {projectid: {$lte: id}}});
        //     }
        // },
        timestamps: false,

    },
)

// Tasks.belongsToMany(Users, {through: "userstask", foreignKey: 'userid', as: 'Users'});
// Users.belongsToMany(Tasks, {through: "userstask", foreignKey: 'taskid', as: 'Tasks'});
//

Tasks.getTasksBuyProjectId = function (projectid) {
    return this.findAll({
        // include: ['Users'],
        where: {projectid}});
}

Tasks.getTaskById = function (taskid) {
    return this.findOne({where: {taskid}});
}

Tasks.getTasksBuyColumnId = function (columnid) {
    return this.findAll({where: {columnid}});
}

Tasks.destroyTasksByColumnId = function (columnid) {
    return this.destroy({where: {columnid}});
}

Tasks.destroyTaskById = function (taskId) {
    return this.destroy({where: {taskId}});
}

Tasks.destroyTasksByProjectId = function (projectid) {
    return this.destroy({where: {projectid}});
}

Tasks.buildNewTask = function (taskname, position, description, users, markers, columnid, projectid) {
    return this.build({
        taskname,
        position,
        description,
        users,
        markers,
        columnid,
        projectid
    });
}

module.exports = Tasks;
