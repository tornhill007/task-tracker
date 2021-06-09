const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');
const Projects = require('./Projects');
const UsersProjects = require('./UsersProjects');
const Tasks = require('./Tasks');
const UsersTask = require('./UsersTask');

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
        tableName: 'users',

    })

Users.findUsersByUserName = function (username) {
    return this.findAll({where: {username}});
}

Users.findUserByUserId = function (userid) {
    return this.findOne({where: {userid}});
}

Users.buildNewUser = function (username, password) {
    return this.build({
        username,
        password
    });
}

Users.getUserByUserId = function (userid) {
    return this.findOne({
        where: {
            userid
        }
    });
}

Users.getUsersTasksByTaskId = function (taskid) {
    return this.findAll({
        include: [{
            model: Tasks,
            as: 'newTasks',
            required: true,
            where: {
                taskid
            },
        }
        ],
    });
}

Users.getUserProject = function (projectid, userid) {
    return this.findOne({
        where: {
            userid: userid
        },
        include: [{
            model: Projects,
            as: 'projects',
            required: true,
            where: {
                projectid,
            },
        }
        ]
    });
}

Users.getAllUsersProjects = function (projectid) {
    return this.findAll({
        include: [{
            model: Projects,
            as: 'projects',
            required: true,
            where: {
                projectid,
            },
        }
        ]
    });
}

Users.getUsersTasksByColumnId = function (columnid) {
    return this.findAll({
        include: [{
            model: Tasks,
            as: 'newTasks',
            required: true,
            where: {
                columnid
            },
        }
        ]
    });
}

Users.getUserByTasksProjectId = function (projectid) {
    return this.findAll({
        include: [{
            model: Tasks,
            as: 'newTasks',
            required: true,
            where: {
                projectid
            },
        }]

    });
}

// Users.getUsersTasksByTaskId = function (taskid) {
//     return this.findAll({
//         include: [{
//             model: Tasks,
//             as: 'newTasks',
//             required: true,
//             where: {
//                 taskid,
//             },
//         }
//         ]
//     });
// }

// Users.getAllProjectsUsers = function (userid) {
//     return this.findAll({
//             include: [{
//                 model: Users,
//                 as: 'users',
//                 required: true,
//                 where: {
//                     userid
//                 }
//             }
//             ]
//         }
//     );
// }

Users.belongsToMany(Projects, {
    through: UsersProjects,
    as: 'projects',
    foreignKey: 'userid',
    otherKey: 'projectid'
});

Projects.belongsToMany(Users, {
    through: UsersProjects,
    as: 'users',
    foreignKey: 'projectid',
    otherKey: 'userid'
});

module.exports = Users;
