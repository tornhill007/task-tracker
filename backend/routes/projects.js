const passport = require('passport')
const express = require("express");
const router = express.Router();
const Projects = require('../models/Projects');
const Users = require('../models/Users');
const catchWrap = require("../common/wrapper")
const jwt = require("jsonwebtoken");
const keys = require('../config/keys');

const {removingProject} = require('../common/removingProject')

router.use('/projects/:projectId?', passport.authenticate('jwt', {session: false}), async function (req, res, next) {
    // const user = await Users.findUserByUserId(req.query.userId ? req.query.userId : req.body.userId);
    let decoded = jwt.verify(req.headers.authorization.split(' ')[1], keys.jwt);
    if (!req.params.projectId) {
        next();
        return;
    }
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

module.exports = router;