const passport = require('passport')
const express = require("express");
const router = express.Router();
const Projects = require('../models/Projects');
const Users = require('../models/Users');
const Columns = require('../models/Columns');
const Tasks = require('../models/Tasks');
const catchWrap = require("../common/wrapper");
const jwt = require("jsonwebtoken");
const keys = require('../config/keys');

const {removingProject} = require('../common/removingProject');

router.use('/projects', passport.authenticate('jwt', {session: false}))

//################projects list

//get all projects

router.get("/projects", catchWrap(async (req, res) => {
    // let {userId} = req.query;
    // let userId = req.query.userId
    let decoded = jwt.verify(req.headers.authorization.split(' ')[1], keys.jwt);
    const results = await Projects.findAll({
            include: [{
                model: Users,
                as: 'users',
                required: true,
                where: {
                    userid: decoded.userId
                }
            }
            ]
        }
    );

    res.json(results);
}))

//create project

router.post("/projects", catchWrap(async (req, res) => {
    const {name, background} = req.body;
    let decoded = jwt.verify(req.headers.authorization.split(' ')[1], keys.jwt);

    const newProject = Projects.buildProjectByName(name, background)
    await newProject.save();

    const user = await Users.getUserByUserId(decoded.userId)

    await newProject.addUser(user);

    res.json(newProject);
}))


router.use('/projects/:projectId', async function (req, res, next) {
    // const user = await Users.findUserByUserId(req.query.userId ? req.query.userId : req.body.userId);
    let decoded = jwt.verify(req.headers.authorization.split(' ')[1], keys.jwt);

    const project = await Projects.findOne({
        where: {
            projectid: req.params.projectId
        },
        include: [{
            model: Users,
            as: 'users',
            require: true,
            where: {
                userid: decoded.userId
            }
        }]
    })

    if (!project) {
        res.status(401).json({
            message: "Unauthorized"
        })
        return;
    }
    next();
})

//update project

router.put("/projects/:projectId", catchWrap(async (req, res) => {
    const {projectId} = req.params;
    const {name} = req.body;
    const updateProject = await Projects.updateProjectNameByProjectId(projectId);
    updateProject.name = name;
    await updateProject.save();
    res.json("Project updated");
}))


//delete project

router.delete("/projects/:projectId", catchWrap(async (req, res) => {
    const {projectId} = req.params;
    // let decoded = jwt.verify(req.headers.authorization.split(' ')[1], keys.jwt);
    await removingProject({projectId});
    res.json("Project deleted");

}))


//get columns by projectsId

router.get("/projects/:projectId/columns", catchWrap(async (req, res) => {

    const {projectId} = req.params;
    const tasks = await Tasks.getTasksBuyProjectId(projectId);
    const columns = await Columns.getColumnsBuyProjectId(projectId);
    let result = {tasks, columns};
    res.json(result);
}))

//create new column

router.post("/projects/:projectId/columns", catchWrap(async (req, res) => {
    const {name} = req.body;
    const {position} = req.body;
    const {projectId} = req.params;
    const newColumn = Columns.buildNewColumn(projectId, name, position);
    await newColumn.save();
    res.json(newColumn);
}))


//update position column

router.put("/projects/:projectId/columns/position", catchWrap(async (req, res) => {

    const {newColumns} = req.body;
    for (let i = 0; i < newColumns.length; i++) {
        const updatedColumn = await Columns.getColumnBuyColumnId(newColumns[i].columnId);
        updatedColumn.position = newColumns[i].position;
        await updatedColumn.save();
    }
    res.json("Column updated");

}))

//create new task

router.post("/projects/:projectId/tasks", catchWrap(async (req, res, next) => {
    const {taskName, position, description, users, markers, columnId} = req.body;
    const {projectId} = req.params;
    const newTask = Tasks.buildNewTask(taskName, position, description, users, markers, columnId, projectId);
    await newTask.save();
    res.json(newTask);
}))

//update task's position and columnId

router.put("/projects/:projectId/tasks/position", catchWrap(async (req, res) => {
    const {tasksArr} = req.body;

    for (let i = 0; i < tasksArr.length; i++) {
        const updatedTask = await Tasks.getTaskById(tasksArr[i].taskid)
        updatedTask.position = tasksArr[i].position;
        updatedTask.columnid = tasksArr[i].columnid;
        await updatedTask.save();
    }
    res.json("Task updated");
}))


router.get("/projects/:projectId/users/active", catchWrap(async (req, res) => {
    let projectId = req.params.projectId
    const results = await Users.getAllUsersProjects(projectId)

    res.json(results);
}))


router.post("/projects/:projectId/users/projects/active", catchWrap(async (req, res) => {

    let {userid} = req.body;
    let {projectId} = req.params;

    const project = await Projects.getProjectByProjectId(projectId);
    const user = await Users.getUserByUserId(userid);

    let result = await project.addUser(user);

    res.json(result);
}))

router.delete("/projects/:projectId/users/projects/active", catchWrap(async (req, res) => {

    let {userid} = req.query;
    let {projectId} = req.params;

    const project = await Projects.getProjectByProjectId(projectId);
    const user = await Users.getUserByUserId(userid);
    await project.removeUser(user);

    const tasks = await Tasks.getTasksBuyProjectId(projectId);
    await user.removeNewTasks(tasks);

    const usersProjects = await Users.getAllUsersProjects(projectId);

    if (usersProjects.length === 0) {
        await removingProject({id: projectId})
        res.json("Project deleted");
        return;
    }

    res.json("Remove user from project");

}))


router.get("/projects/:projectId/tasks/users/:userId", catchWrap(async (req, res) => {

    let {projectId} = req.params;

    const tasks = await Tasks.findAll({
        attributes: ['taskid'],
        where: {
            projectid: projectId
        },
        include: [{
            model: Users,
            as: "newUsers",
            required: true,
            attributes: ['userid', 'username']
        }]
    })

    res.json(tasks);

}))

router.use('/projects/:projectId/task/user/:taskId/:userId', async function (req, res, next) {
    // const user = await Users.findUserByUserId(req.query.userId ? req.query.userId : req.body.userId);
    let decoded = jwt.verify(req.headers.authorization.split(' ')[1], keys.jwt);

    let project = await Projects.findOne({
        where: {
            projectid: req.params.projectId
        },
        include: [{
            model: Users,
            as: 'users',
            required: true,
            where: {
                userid: req.params.userId
            }
        }]
    });

    let task = await Tasks.getTaskById(req.params.taskId);

    if (!project || project.projectid != task.projectid) {
        res.status(401).json({
            message: "Unauthorized"
        })
        return;
    }
    next();


    // let column = await Columns.getColumnBuyColumnId(req.params.columnId);

    // const task = await Tasks.getTaskById(req.params.taskId);

    // if(task.projectid != req.params.projectId) {
    //     res.status(401).json({
    //         message: "Unauthorized"
    //     })
    //     return;
    // }
})


router.post("/task/user/:taskId/:userId", catchWrap(async (req, res) => {

    let {userId, taskId} = req.params;
    const task = await Tasks.getTaskById(taskId)
    const user = await Users.getUserByUserId(userId)
    const result = await task.addNewUser(user);

    res.json(result);
}))

router.delete("task/user/:taskId/:userId", catchWrap(async (req, res) => {

    let {userId, taskId} = req.params;
    const task = await Tasks.getTaskById(taskId);
    const user = await Users.getUserByUserId(userId);
    const result = await task.removeNewUser(user);
    res.json("Remove user from project");

}))


router.use('/projects/:projectId/tasks/:taskId', async function (req, res, next) {
    // const user = await Users.findUserByUserId(req.query.userId ? req.query.userId : req.body.userId);
    let decoded = jwt.verify(req.headers.authorization.split(' ')[1], keys.jwt);

    // let column = await Columns.getColumnBuyColumnId(req.params.columnId);

    const task = await Tasks.getTaskById(req.params.taskId);

    if (task.projectid != req.params.projectId) {
        res.status(401).json({
            message: "Unauthorized"
        })
        return;
    }
    next();
})

//update task

router.put("/projects/:projectId/tasks/:taskId", catchWrap(async (req, res) => {
    const {taskId} = req.params;
    const arr = {...req.body};
    const updateTask = await Tasks.getTaskById(taskId);
    for (let i in arr) {
        updateTask[i] = arr[i];
        await updateTask.save();
    }
    res.json("Task updated");
}))


//delete task

router.delete("/projects/:projectId/tasks/:taskId", catchWrap(async (req, res) => {
    const {taskId} = req.params;
    const deletedTask = await Tasks.getTaskById(taskId);
    const users = await Users.findAll({
        include: [{
            model: Tasks,
            as: 'newTasks',
            required: true,
            where: {
                taskid: taskId
            },
        }
        ]
    });
    await deletedTask.removeNewUsers(users)
    await deletedTask.destroy();
    res.json("Task deleted");
}))


router.use('/projects/:projectId/:columnId', async function (req, res, next) {
    // const user = await Users.findUserByUserId(req.query.userId ? req.query.userId : req.body.userId);
    let decoded = jwt.verify(req.headers.authorization.split(' ')[1], keys.jwt);

    let column = await Columns.getColumnBuyColumnId(req.params.columnId);

    if (column.projectid != req.params.projectId) {
        res.status(401).json({
            message: "Unauthorized"
        })
        return;
    }
    next();
})


//update column

router.put("/projects/:projectId/:columnId/columns", catchWrap(async (req, res) => {
    const {columnId} = req.params;
    const {name} = req.body;
    const updateColumn = await Columns.getColumnBuyColumnId(columnId);
    updateColumn.name = name;
    await updateColumn.save();
    res.json("Column updated");
}))


//delete column

router.delete("/projects/:projectId/:columnId/columns", catchWrap(async (req, res) => {
        const {columnId} = req.params;

        const users = await Users.findAll({
            include: [{
                model: Tasks,
                as: 'newTasks',
                required: true,
                where: {
                    columnid: columnId,
                },
            }
            ]
        });

        const tasks = await Tasks.getTasksBuyColumnId(columnId);

        for (let key of tasks) {
            await key.removeNewUsers(users);
        }
        const deletedTasks = await Tasks.destroyTasksByColumnId(columnId);
        const deletedColumn = await Columns.getColumnBuyColumnId(columnId);
        await deletedColumn.destroy();

        res.json("Project deleted");
    })
)


module.exports = router;