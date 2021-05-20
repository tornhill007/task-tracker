const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');


 const University = db.define('university', {
            universityid: {
                type: DataTypes.UUID,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            universityname: {
                type: DataTypes.STRING,
            },

        },
        {
            timestamps: false,
            tableName: 'university'
        })




module.exports = University;

//
//

