const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const express = require("express");
const router = express.Router();
const pool = require('../db');
const passport = require('passport')
const sequelize = require('../config/database');

const Registration = require('../models/Registration');

//################registration
const catchWrap = require("../common/wrapper")

const UsersProjects = require('../models/UsersProjects');

router.use('/activeusers', passport.authenticate('jwt', {session: false}))


router.post("/activeusers", catchWrap(async (req, res) => {
    // let {userId} = req.query;
    let {projectid, userid} = req.body;
    // console.log(projectId);
    // const allProjects = await Projects.findAll();
    const result = await UsersProjects.create({
        projectid, userid
    })
    console.log(result)
    res.json(result);
}))

router.delete("/activeusers", catchWrap(async (req, res) => {
    // let {userId} = req.query;
    // let {projectid, userid} = req.body;
     let {projectid, userid} = req.query;
    // console.log(projectId);
    // const allProjects = await Projects.findAll();
    const result = await UsersProjects.destroy({
        where: {
            projectid,
            userid
        }
    })
console.log("userid", userid);
    const allUsersProjects = await UsersProjects.findAll({
        where: {
            projectid
        }
    })

    console.log("allUsersProjects", allUsersProjects);

    res.json(allUsersProjects);


    console.log(result)

}))

// router.delete("/activeusers/:id", catchWrap(async (req, res) => {
//     // let {userId} = req.query;
//     // let {projectid, userid} = req.body;
//     let {projectid, userid} = req.query;
//     // console.log(projectId);
//     // const allProjects = await Projects.findAll();
//     const result = await UsersProjects.destroy({
//         where: {
//             projectid,
//             userid
//         }
//     })
//     console.log(result)
//     res.json(result);
// }))


module.exports = router;