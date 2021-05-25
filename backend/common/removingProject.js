const sequelize = require('../config/database');
const Projects = require('../models/Projects');
const Columns = require('../models/Columns');
const Tasks = require('../models/Tasks');
const Users = require('../models/Users');
const UsersProjects = require('../models/UsersProjects');

module.exports = {
    removingProject: async (params) => {

        const {id} = params;

        // const removeUsersProjects = await UsersProjects.destroyUsersProjectsByProjectId(id);

        const project = await Projects.getProjectByProjectId(id);
        const users = await Users.getAllUsersProjects(id);
        let result = await project.removeUsers(users);


        const usersTasks = await Users.findAll({
            include: [{
                model: Tasks,
                as: 'newTasks',
                required: true,
                where: {
                    projectid: id,
                },
            }
            ]
        })

        const tasks = await Tasks.getTasksBuyProjectId(id);

        for(let key of usersTasks) {
            await key.removeNewTasks(tasks);
        }
        const deletedTasks = await Tasks.destroyTasksByProjectId(id);
        const deletedColumns = await Columns.destroyColumnsByProjectId(id);

        const deletedProject = await Projects.getProjectByProjectId(id);
        await deletedProject.destroy();


    }
}