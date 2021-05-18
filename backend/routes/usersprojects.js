const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const express = require("express");
const router = express.Router();
const pool = require('../db');
const passport = require('passport')
const sequelize = require('../config/database');

const {removingProject} = require('../common/removingProject');

const Users = require('../models/Users');

//################registration
const catchWrap = require("../common/wrapper")

const UsersProjects = require('../models/UsersProjects');

router.use('/users', passport.authenticate('jwt', {session: false}))


router.post("/users/projects/active", catchWrap(async (req, res) => {

    let {projectid, userid} = req.body;

    const result = await UsersProjects.create({
        projectid, userid
    })
    res.json(result);
}))

router.delete("/users/projects/active", catchWrap(async (req, res) => {

     let {projectid, userid} = req.query;

    const result = await UsersProjects.findOne({
        where: {
            projectid,
            userid
        }
    })

    await result.destroy();

    const allUsersProjects = await UsersProjects.findAll({
        where: {
            projectid
        }
    })

    if(allUsersProjects.length === 0) {
        await removingProject({id: projectid})
        res.json("Project deleted");
        return;
    }

    res.json("Remove user from project");

}))


module.exports = router;