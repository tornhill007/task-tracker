const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');


const Column = db.define('kanbancolumns', {
    columnid: {
        type: DataTypes.UUID,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    projectlistid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    position: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

},
    {
        timestamps: false
    })

module.exports = Column;
// columnId      SERIAL PRIMARY KEY,
//     projectListId NUMERIC,
//     name          VARCHAR(255),
//     position NUMERIC