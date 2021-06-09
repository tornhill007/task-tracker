//###########tasks
const passport = require('passport');
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require('../config/keys');
const Tasks = require('../models/Tasks');
const Users = require('../models/Users');
const Projects = require('../models/Projects');

const catchWrap = require("../common/wrapper");

// router.use('/', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    // let decoded = jwt.verify(req.headers.authorization.split(' ')[1], keys.jwt);
    // let user;
    //
    // const project = await Projects.findOne({
    //     where: {
    //         projectid: req.params.projectId
    //     },
    //     include: [{
    //         model: Users,
    //         as: 'users',
    //         required: true,
    //         where: {
    //             userid: decoded.userId
    //         }
    //     }
    //     ]
    // })

    // const task = await Tasks.getTaskById(req.params.taskId);
    //
    // user = await Users.getUserProject(req.params.projectId, decoded.userId);
    //
    // if (!project) {
    //     res.status(401).json({
    //         message: "Unauthorized"
    //     })
    //     return;
    // }
    //
    //
    // if(task && task.projectid == project.projectid) {
    //     next();
    //     return
    // }
    //
    // res.status(401).json({
    //     message: "Unauthorized"
    // })
    // next();

    // if (!project) {
    //     res.status(401).json({
    //         message: "Unauthorized"
    //     })
    //     return;
    // }
    // next();

// })


// router.post("/task/user/:taskId/:userId", catchWrap(async (req, res) => {
//
//     let {userId, taskId} = req.params;
//     const task = await Tasks.getTaskById(taskId)
//     const user = await Users.getUserByUserId(userId)
//     const result = await task.addNewUser(user);
//
//     res.json(result);
// }))
//
// router.delete("/task/user/:taskId/:userId", catchWrap(async (req, res) => {
//
//     let {userId, taskId} = req.params;
//     const task = await Tasks.getTaskById(taskId);
//     const user = await Users.getUserByUserId(userId);
//     const result = await task.removeNewUser(user);
//     res.json("Remove user from project");
//
// }))


module.exports = router;
