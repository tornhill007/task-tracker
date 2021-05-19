//###########tasks
const passport = require('passport')
const express = require("express");
const router = express.Router();
const pool = require('../db')

const Tasks = require('../models/Tasks');

const catchWrap = require("../common/wrapper")
const {wrapWhereProjectId, wrapWhereColumnId, wrapWhereTaskId} = require('../common/wrapWhere')

router.use('/tasks', passport.authenticate('jwt', {session: false}))


//create new task

router.post("/tasks", catchWrap(async (req, res, next) => {
    const {taskName, position, description, users, markers, columnId, projectId} = req.body;
    const newTask = Tasks.buildNewTask(taskName, position, description, users, markers, columnId, projectId);
    await newTask.save();
    res.json(newTask);

}))


//get all project's tasks

router.get("/tasks/:projectId", catchWrap(async (req, res,) => {
    const {projectId} = req.params;
    const allTasks = await Tasks.getTasksBuyProjectId(projectId);
    res.json(allTasks);
}))


//get all column's tasks

router.get("/tasks", catchWrap(async (req, res) => {
    const {columnId} = req.body;
    const allTasks = await Tasks.getTasksBuyColumnId(columnId);
    res.json(allTasks);
}))


//get task

router.get("/tasks/:projectId/:id", catchWrap(async (req, res) => {
    const {id} = req.params;
    const task = await Tasks.getTaskById(id);
    res.json(task);
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
    const updateTaskName = await Tasks.getTaskById(id);
    for (let i in arr) {
        updateTaskName[i] = arr[i];
        await updateTaskName.save();
    }
    res.json("Task updated");
}))


//delete all task from column

router.delete("/tasks/:projectId/:id", catchWrap(async (req, res) => {
    const {id} = req.params;
    const deletedTasks = await Tasks.destroyTasksByColumnId(id);
    res.json("Tasks deleted");
}))


//delete task

router.delete("/task/:projectId/:id", catchWrap(async (req, res) => {
    const {id} = req.params;
    const deletedTask = await Tasks.destroyTaskById(id);
    res.json("Task deleted");
}))


module.exports = router;
