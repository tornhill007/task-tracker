const passport = require('passport')
const express = require("express");
const router = express.Router();
const Projects = require('../models/Projects');
const Users = require('../models/Users');
const catchWrap = require("../common/wrapper")
const jwt = require("jsonwebtoken");
const keys = require('../config/keys');

const {removingProject} = require('../common/removingProject')

router.use('/projects', passport.authenticate('jwt', {session: false}), async function (req, res, next) {
    const user = await Users.findUserByUserId(req.query.userId ? req.query.userId : req.body.userId);
    let decoded = jwt.verify(req.headers.authorization.split(' ')[1], keys.jwt);
    if(decoded.userId !== user.userid) {
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
    let userId = req.query.userId

    const results = await Projects.findAll({

            include: [{
                model: Users,
                as: 'users',
                required: true,
                where: {
                    userid: +userId
                }
            }
            ]
        }
    );

    res.json(results);
}))

//create project

router.post("/projects", catchWrap(async (req, res) => {
    const {name, userId, background} = req.body;
    const newProject = Projects.buildProjectByName(name, background)
    await newProject.save();

    const user = await Users.getUserByUserId(userId)

    await newProject.addUser(user);

    res.json(newProject);
}))

//update project

router.put("/projects/:id", catchWrap(async (req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    const updateProject = await Projects.updateProjectNameByProjectId(id);
    updateProject.name = name;
    await updateProject.save();
    res.json("Project updated");
}))

//delete project

router.delete("/projects/:id", catchWrap(async (req, res) => {
    const {id} = req.params;

    await removingProject({id});
    res.json("Project deleted");

}))

module.exports = router;