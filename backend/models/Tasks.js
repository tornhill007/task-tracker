const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');
const Users = require('./Users');
const UsersTask = require('./UsersTask');

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
        tableName: 'tasks'
    },
)

Tasks.belongsToMany(Users, {
    through: UsersTask,
    as: 'newUsers',
    foreignKey: 'taskid',
    otherKey: 'userid'
});


Users.belongsToMany(Tasks, {
    through: UsersTask,
    as: 'newTasks',
    foreignKey: 'userid',
    otherKey: 'taskid'
});




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

Tasks.destroyTaskById = function (taskid) {
    return this.destroy({where: {taskid}});
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


// Tasks.associate = (models) => {
//     Tasks.belongsToMany(models.users, {
//         through: models.userstask,
//         foreignKey: "taskid"
//     });
// }


// Users.belongsToMany(Tasks, {
//     through: UsersTask,
//     as: 'test2',
//     foreignKey: 'userid',
//     otherKey: 'taskid'
// });


module.exports = Tasks;
