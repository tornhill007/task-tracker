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

// router.use('/users/projects/active', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
//     let decoded = jwt.verify(req.headers.authorization.split(' ')[1], keys.jwt);
//     let projectid = req.method === "POST" ? req.body.projectid : req.query.projectid;
//
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




module.exports = router;