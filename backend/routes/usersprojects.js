const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const express = require("express");
const router = express.Router();
const passport = require('passport');
const {removingProject} = require('../common/removingProject');
const Users = require('../models/Users');
const Projects = require('../models/Projects');
const Tasks = require('../models/Tasks');

//################registration
const catchWrap = require("../common/wrapper")

router.use('/users/projects/active', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    let decoded = jwt.verify(req.headers.authorization.split(' ')[1], keys.jwt);
    let projectid = req.method === "POST" ? req.body.projectid : req.query.projectid;

    let user = await Users.getUserProject(projectid, decoded.userId)

    if (!user) {
        res.status(401).json({
            message: "Unauthorized"
        })
        return;
    }
    next();

})

router.post("/users/projects/active", catchWrap(async (req, res) => {

    let {projectid, userid} = req.body;

    const project = await Projects.getProjectByProjectId(projectid);
    const user = await Users.getUserByUserId(userid);

    let result = await project.addUser(user);

    res.json(result);
}))

router.delete("/users/projects/active", catchWrap(async (req, res) => {

    let {projectid, userid} = req.query;

    const project = await Projects.getProjectByProjectId(projectid);
    const user = await Users.getUserByUserId(userid);
    await project.removeUser(user);

    const tasks = await Tasks.getTasksBuyProjectId(projectid);
    await user.removeNewTasks(tasks);

    const usersProjects = await Users.getAllUsersProjects(projectid);

    if (usersProjects.length === 0) {
        await removingProject({id: projectid})
        res.json("Project deleted");
        return;
    }

    res.json("Remove user from project");

}))


module.exports = router;