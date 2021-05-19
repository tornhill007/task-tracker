// const {Sequelize, DataTypes} = require('sequelize');
// const db = require('../config/database');
//
// const Tasks = require('../models/Tasks');
//
//
// const UsersTask = db.define('userstask', {
//         id: {
//             type: DataTypes.UUID,
//             autoIncrement: true,
//             primaryKey: true,
//             allowNull: false
//         },
//         taskid: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         },
//         userid: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         },
//     },
//     {
//         timestamps: false,
//         tableName: 'userstask'
//     })
//
// // UsersTask.hasOne(Tasks, {
// //     foreignKey: {
// //         name: 'userid'
// //     }
// // });
// //
// // Tasks.belongsTo(UsersTask);
//
// module.exports = UsersTask;
