const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');


const StudentsUniversity = db.define('studentsuniversity', {
        studentId: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        universityId: {
            type: DataTypes.NUMBER,
            allowNull: false
        },

    },
    {
        timestamps: false,
        tableName: 'studentsuniversity'
    })

module.exports = StudentsUniversity