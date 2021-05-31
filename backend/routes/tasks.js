//###########tasks
const passport = require('passport')
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require('../config/keys');
const Tasks = require('../models/Tasks');
const Users = require('../models/Users');


const catchWrap = require("../common/wrapper");

router.use('/tasks/:projectId', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    let decoded = jwt.verify(req.headers.authorization.split(' ')[1], keys.jwt);
    let user;

    if(req.params.projectId === 'position') {
        next();
        return;
    }

    user = await Users.getUserProject(req.params.projectId, decoded.userId);

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


//delete task

router.delete("/tasks/:projectId/:id", catchWrap(async (req, res) => {
    const {id} = req.params;
    const deletedTask = await Tasks.getTaskById(id);
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
