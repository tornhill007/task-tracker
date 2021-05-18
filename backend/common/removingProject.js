const sequelize = require('../config/database');
const Projects = require('../models/Projects');
const Columns = require('../models/Columns');
const Tasks = require('../models/Tasks');
const UsersProjects = require('../models/UsersProjects');

module.exports = {
    removingProject: async (params) => {

        const {id} = params;


        const removeUsersProjects = await UsersProjects.findOne({
            where: {
                projectid: id
            }
        })

        await removeUsersProjects.destroy();

        const deletedTasks = await Tasks.findOne({
            where: {
                projectid: id
            }
        });

        await deletedTasks.destroy();

        const deletedColumns = await Columns.findOne({
            where: {
                projectid: id
            }
        });
        await deletedColumns.destroy();

        const deletedProject = await Projects.findOne({
            where: {
                projectid: id
            }
        });

        await deletedProject.destroy();


    }
}