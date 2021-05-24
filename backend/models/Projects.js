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


//Projects.belongsToMany(UsersProjects, {through: UsersProjects, as: 'Users', foreignKey: 'id'});
// Projects.belongsToMany(Users, {through: 'usersprojects'});

Projects.buildProjectByName = function (name) {
    return this.build({name});
}

Projects.updateProjectNameByProjectId = function (id) {
    return this.findOne({where: {projectid: id}});
}

Projects.getProjectByProjectId = function (projectid) {
    return this.findOne({where: {projectid}});
}

// Projects.getUsersProjects = function (userid) {
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



//
// //
//
// db.sync({force: true})
// Projects.hasOne(UsersProjects, {
//     foreignKey: {
//         name: 'userid'
//     }
// });
// UsersProjects.belongsTo(Projects);

module.exports = Projects;
