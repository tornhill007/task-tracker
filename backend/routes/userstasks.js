const express = require("express");
const router = express.Router();
const Users = require('../models/Users');
const Tasks = require('../models/Tasks');


//################registration
const catchWrap = require("../common/wrapper")

router.get("/tasks/:projectId/:userId", catchWrap(async (req, res) => {

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

router.post("/task/user", catchWrap(async (req, res) => {

    let {userId, taskId} = req.body;
    const task = await Tasks.getTaskById(taskId)
    const user = await Users.getUserByUserId(userId)
    const result = await task.addNewUser(user);

    res.json(result);
}))

router.delete("/task/user/:taskId/:userId", catchWrap(async (req, res) => {

    let {userId, taskId} = req.params;
    const task = await Tasks.getTaskById(taskId);
    const user = await Users.getUserByUserId(userId);
    const result = await task.removeNewUser(user);
    res.json("Remove user from project");

}))

router.get("/task/user/:taskId/:userId", catchWrap(async (req, res) => {

    let {userId, taskId} = req.params;
    const users = await Users.findAll({
        include: [{
            model: Tasks,
            as: 'newTasks',
            required: true,
            where: {
                taskid: taskId,
            },
        }
        ],
    });

    res.json(users);

}))

module.exports = router;