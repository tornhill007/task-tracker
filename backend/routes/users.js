const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const express = require("express");
const router = express.Router();
const passport = require('passport');
const Users = require('../models/Users');

//################registration
const catchWrap = require("../common/wrapper");

// router.use('/users/active', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
//     let decoded = jwt.verify(req.headers.authorization.split(' ')[1], keys.jwt);
//     let user;
//
//     user = await Users.getUserProject(req.query.projectId, decoded.userId)
//
//     if (!user) {
//         res.status(401).json({
//             message: "Unauthorized"
//         })
//         return;
//     }
//     next();
//
// });

router.get("/users", catchWrap(async (req, res) => {
    const users = await Users.findAll();
    res.json(users);
}))



router.post("/users", catchWrap(async (req, res) => {
    const {password, userName} = req.body;

    const user = await Users.findUsersByUserName(userName)
    if (user.length !== 0) {
        res.status(409).json({
            message: "This login is already taken"
        })
        return;
    }

    const salt = bcrypt.genSaltSync(10);
    const newUser = await Users.buildNewUser(userName, bcrypt.hashSync(password, salt))
    await newUser.save();
    res.json(newUser);
}))

module.exports = router;