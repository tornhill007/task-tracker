//###########tasks
const passport = require('passport')
const express = require("express");
const router = express.Router();
const pool = require('../db')
const jwt = require("jsonwebtoken");
const keys = require('../config/keys');

const Tasks = require('../models/Tasks');
const Users = require('../models/Users');
const Projects = require('../models/Projects');
const UsersProjects = require('../models/UsersProjects');

const catchWrap = require("../common/wrapper");
const {wrapWhereProjectId, wrapWhereColumnId, wrapWhereTaskId} = require('../common/wrapWhere')

router.use('/tasks/:projectId', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    let decoded = jwt.verify(req.headers.authorization.split(' ')[1], keys.jwt);
    let user;

    // user = await UsersProjects.getUsersProjects(req.params.projectId, decoded.userId);
    user = await Users.getUserProject(req.params.projectId, decoded.userId);
    // findOne({
    //     where: {
    //         userid: decoded.userId
    //     },
    //     include: [{
    //         model: Projects,
    //         as: 'projects',
    //         required: true,
    //         where: {
    //             projectid: req.params.projectId,
    //         }
    //     }
    //     ]
    // });


    if (!user) {
        res.status(401).json({
            message: "Unauthorized"
        })
        return;
    }
    next();

})


//create new task

router.post("/tasks/:projectId", catchWrap(async (req, res, next) => {
    const {taskName, position, description, users, markers, columnId} = req.body;
    const {projectId} = req.params;
    const newTask = Tasks.buildNewTask(taskName, position, description, users, markers, columnId, projectId);
    await newTask.save();
    res.json(newTask);

}))


//get all project's tasks

// router.get("/tasks/:projectId", catchWrap(async (req, res,) => {
//     const {projectId} = req.params;
//     const allTasks = await Tasks.getTasksBuyProjectId(projectId);
//     res.json(allTasks);
// }))


// //get all column's tasks
//
// router.get("/tasks", catchWrap(async (req, res) => {
//     const {columnId} = req.body;
//     const allTasks = await Tasks.getTasksBuyColumnId(columnId);
//     res.json(allTasks);
// }))


// //get task
//
// router.get("/tasks/:projectId/:id", catchWrap(async (req, res) => {
//     const {id} = req.params;
//     const task = await Tasks.getTaskById(id);
//     res.json(task);
// }))

//update task's position and columnId


router.put("/tasks/position/:projectId", catchWrap(async (req, res) => {
    const {tasksArr} = req.body;

    for (let i = 0; i < tasksArr.length; i++) {
        const updatedTask = await Tasks.getTaskById(tasksArr[i].taskid)
        updatedTask.position = tasksArr[i].position;
        updatedTask.columnid = tasksArr[i].columnid;
        await updatedTask.save();

    }

    res.json("Task updated");

}))


//update task

router.put("/tasks/:projectId/:id", catchWrap(async (req, res) => {
    const {id} = req.params;
    const arr = {...req.body};
    const updateTask = await Tasks.getTaskById(id);
    for (let i in arr) {
        updateTask[i] = arr[i];
        await updateTask.save();
    }
    res.json("Task updated");
}))


//delete all task from column

// router.delete("/tasks/:projectId/:id", catchWrap(async (req, res) => {
//     const {id} = req.params;
//     const deletedTasks = await Tasks.destroyTasksByColumnId(id);
//     res.json("Tasks deleted");
// }))


//delete task

router.delete("/tasks/:projectId/:id", catchWrap(async (req, res) => {
    const {id} = req.params;
    // const deletedTask = await Tasks.destroyTaskById(id);
    const deletedTask = await Tasks.getTaskById(id);
    // const users = await Users.getUsersTasksByTaskId(id);
    const users = await Users.findAll({
        include: [{
            model: Tasks,
            as: 'newTasks',
            required: true,
            where: {
                taskid: id
            },
        }
        ]
    });
    await deletedTask.removeNewUsers(users)
    await deletedTask.destroy();
    res.json("Task deleted");
}))


module.exports = router;
