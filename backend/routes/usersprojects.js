const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const express = require("express");
const router = express.Router();
const pool = require('../db');
const passport = require('passport');
const sequelize = require('../config/database');

const {removingProject} = require('../common/removingProject');
const {wrapWhereProjectId, wrapWhereProjectAndUserIds} = require('../common/wrapWhere');

const Users = require('../models/Users');

//################registration
const catchWrap = require("../common/wrapper")

const UsersProjects = require('../models/UsersProjects');

router.use('/users', passport.authenticate('jwt', {session: false}))


router.post("/users/projects/active", catchWrap(async (req, res) => {

    let {projectid, userid} = req.body;

    const result = UsersProjects.buildUsersProject( projectid, userid);

    await result.save();
    res.json(result);
}))

router.delete("/users/projects/active", catchWrap(async (req, res) => {

    let {projectid, userid} = req.query;

    const result = await UsersProjects.getUsersProjects(projectid, userid);
    await result.destroy();
    const allUsersProjects = await UsersProjects.getAllUsersProjectsByProjectId(projectid);

    if (allUsersProjects.length === 0) {
        await removingProject({id: projectid})
        res.json("Project deleted");
        return;
    }

    res.json("Remove user from project");

}))


module.exports = router;