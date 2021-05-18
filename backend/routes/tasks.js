//###########tasks
const passport = require('passport')
const express = require("express");
const router = express.Router();
const pool = require('../db')

const Tasks = require('../models/Tasks');

const catchWrap = require("../common/wrapper")


// router.use('/task', passport.authenticate('jwt', {session: false}))
router.use('/tasks', passport.authenticate('jwt', {session: false}))


//create new task

router.post("/tasks", catchWrap(async (req, res, next) => {
    const {taskName, position, description, users, markers, columnId, projectId} = req.body;
    const newTask = Tasks.build({
        taskname: taskName,
        position,
        description,
        users,
        markers,
        columnid: columnId,
        projectid: projectId
    })
    await newTask.save();
    res.json(newTask);

}))


//get all project's tasks

router.get("/tasks/:projectId", catchWrap(async (req, res,) => {
    const {projectId} = req.params;
    const allTasks = await Tasks.findAll({
        where: {
            projectid: projectId
        }
    });
    res.json(allTasks);
}))


//get all column's tasks

router.get("/tasks", catchWrap(async (req, res) => {
    const {columnId} = req.body;
    const allTasks = await Tasks.findAll({
        where: {
            columnid: columnId
        }
    });
    res.json(allTasks);
}))


//get task

router.get("/tasks/:projectId/:id", catchWrap(async (req, res) => {
    const {id} = req.params;
    const task = await Tasks.findAll({
        where: {
            taskid: id
        }
    });
    res.json(task);
}))

//update task's position and columnId


router.put("/tasks/position/:projectId", catchWrap(async (req, res) => {
    const {tasksArr} = req.body;

    for (let i = 0; i < tasksArr.length; i++) {
        const updatedTask = await Tasks.findOne({
            where: {
                taskid: tasksArr[i].taskid
            }
        });
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
    const updateTaskName = await Tasks.findOne({
        where: {
            taskid: id
        }
    });
    for (let i in arr) {
        updateTaskName[i] = arr[i];
        await updateTaskName.save();
    }
    res.json("Task updated");
}))


//delete all task from column

router.delete("/tasks/:projectId/:id", catchWrap(async (req, res) => {
    const {id} = req.params;
    const deletedTasks = await Tasks.destroy({
        where: {
            columnid: id
        }
    });
    res.json("Tasks deleted");
}))


//delete task

router.delete("/task/:projectId/:id", catchWrap(async (req, res) => {
    const {id} = req.params;
    const deletedTask = await Tasks.destroy({
        where: {
            taskid: id
        }
    });
    res.json("Task deleted");
}))


module.exports = router;
