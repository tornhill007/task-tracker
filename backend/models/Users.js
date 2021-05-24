const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');
const Projects = require('./Projects');
const UsersProjects = require('./UsersProjects');
const Tasks = require('./UsersProjects');
const UsersTasks = require('./UsersTask');

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
        tableName: 'users'
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

//
//

// Users.associate = (models) => {
//     Users.belongsToMany(models.tasks, {
//         through: models.userstask,
//         foreignKey: "userid"
//     });
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



// Users.associate = (models) => {
//     Users.belongsTo(models.tasks, {foreignKey: 'userid', as: 'afdsfdsf', otherKey: 'taskid'});
// };
//
// Users.belongsToMany(Tasks, {
//     through: UsersTask,
//     as: 'taskss',
//     foreignKey: 'userid',
//     otherKey: 'taskid'
// });
//





// db.sync({force:true}).then(()=>{
//
//     console.log("Tables have been created");
// }).catch(err=>console.log(err));

module.exports = Users;
