const sequelize = require('../config/database');
const Projects = require('../models/Projects');
const Columns = require('../models/Columns');
const Tasks = require('../models/Tasks');
const Users = require('../models/Users');
const UsersProjects = require('../models/UsersProjects');

module.exports = {
    removingProject: async (params) => {

        const {projectId} = params;

        // const removeUsersProjects = await UsersProjects.destroyUsersProjectsByProjectId(id);

        const project = await Projects.getProjectByProjectId(projectId);
        const users = await Users.getAllUsersProjects(projectId);
        let result = await project.removeUsers(users);


        const usersTasks = await Users.findAll({
            include: [{
                model: Tasks,
                as: 'newTasks',
                required: true,
                where: {
                    projectid: projectId,
                },
            }
            ]
        })

        const tasks = await Tasks.getTasksBuyProjectId(projectId);

        for(let key of usersTasks) {
            await key.removeNewTasks(tasks);
        }
        const deletedTasks = await Tasks.destroyTasksByProjectId(projectId);
        const deletedColumns = await Columns.destroyColumnsByProjectId(projectId);

        const deletedProject = await Projects.getProjectByProjectId(projectId);
        await deletedProject.destroy();


    }
}