const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');
const University = require('./University')
const StudentsUniversity = require('./StudentsUniversity')


const Student = db.define('student', {
        studentid: {
            type: DataTypes.UUID,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        studentname: {
            type: DataTypes.STRING,
        },

    },
    {
        timestamps: false,
        tableName: 'student'
    })

University.belongsToMany(Student, {through: StudentsUniversity});
Student.belongsToMany(University, {through: StudentsUniversity});
//

// db.sync({force:true}).then(()=>{
//
//     console.log("Tables have been created");
// }).catch(err=>console.log(err));
//

module.exports = Student;