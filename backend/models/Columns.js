const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');


const Column = db.define('kanbancolumns', {
        columnid: {
            type: DataTypes.UUID,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        projectid: {
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

Column.getColumnsBuyProjectId = function (id) {
    return this.findAll({where: {projectid: id}});
}

Column.buildNewColumn = function (projectid, name, position) {
    return this.build({
        projectid,
        name,
        position
    });
}

Column.getColumnBuyColumnId = function (id) {
    return this.findOne({where: {columnid: id}});
}

Column.destroyColumnsByProjectId = function (projectid) {
    return this.destroy({where: {projectid}});
}

module.exports = Column;
