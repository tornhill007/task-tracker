const sequelize = require('../config/database');
const Projects = require('../models/Projects');
const Columns = require('../models/Columns');
const Tasks = require('../models/Tasks');
const UsersProjects = require('../models/UsersProjects');

module.exports = {
    removingProject: async (params) => {

        const {id} = params;


        const removeUsersProjects = await UsersProjects.destroyUsersProjectsByProjectId(id)

        const deletedTasks = await Tasks.destroyTasksByProjectId(id)

        const deletedColumns = await Columns.destroyColumnsByProjectId(id);


        const deletedProject = await Projects.getProjectByProjectId(id);
        await deletedProject.destroy();


    }
}