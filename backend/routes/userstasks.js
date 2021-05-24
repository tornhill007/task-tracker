
const express = require("express");
const router = express.Router();


const Users = require('../models/Users');

const Tasks = require('../models/Tasks');

const UsersTask = require('../models/UsersTask');

//################registration
const catchWrap = require("../common/wrapper")

// const UsersProjects = require('../models/UsersProjects');

//
// router.use('/users/projects/active', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
//     let decoded = jwt.verify(req.headers.authorization.split(' ')[1], keys.jwt);
//     let projectid = req.method === "POST" ? req.body.projectid : req.query.projectid;
//
//     // let user = await UsersProjects.getUsersProjects(projectid, decoded.userId);
//     let user = await Users.getUserProject(projectid, decoded.userId)
//
//     if (!user) {
//         res.status(401).json({
//             message: "Unauthorized"
//         })
//         return;
//     }
//     next();
//
// })


router.post("/task/user", catchWrap(async (req, res) => {

    let {userId, taskId} = req.body;
    // let {projectId, taskId} = req.params;

    const task = await Tasks.getTaskById(taskId)

    const user = await Users.getUserByUserId(userId)

   const result = await task.addNewUser(user);

    // const project = await Projects.getProjectByProjectId(projectid);
    // const user = await Users.getUserByUserId(userid);

    // if (!product) {
    //     return res.status(400);
    // }

   // let result = await project.addUser(user);

    res.json(result);
}))

router.delete("/task/user/:taskId/:userId", catchWrap(async (req, res) => {

    let {userId, taskId} = req.params;
    // let {projectId, taskId} = req.params;

    const task = await Tasks.getTaskById(taskId);

    const user = await Users.getUserByUserId(userId);

    const result = await task.removeNewUsers(user);

    res.json("Remove user from project");

}))

router.get("/task/user/:taskId/:userId", catchWrap(async (req, res) => {

    let {userId, taskId} = req.params;
    // let {projectId, taskId} = req.params;

    // const task = await Tasks.findOne({
    //     where: {
    //         taskid: taskId
    //     }
    // });

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

    // const result = await task.removeNewUsers(user);

    res.json(users);

}))


module.exports = router;