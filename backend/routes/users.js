const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const express = require("express");
const router = express.Router();
const pool = require('../db');
const sequelize = require('../config/database');

const Users = require('../models/Users');
const Projects = require('../models/Projects');
const UsersProjects = require('../models/UsersProjects');
const {wrapWhereUserName} = require('../common/wrapWhere')

//################registration
const catchWrap = require("../common/wrapper")


router.get("/users", catchWrap(async (req, res) => {
    // const {password, userName} = req.body;
    const users = await Users.findAll();
    res.json(users);
}))

router.get("/users/active", catchWrap(async (req, res) => {
    let projectId = req.query.projectId

    // const results = await Users.findAll({
    //     include: [
    //         {
    //             model: Projects,
    //         }
    //     ]
    // })

    const [results, metadata] = await sequelize.query("SELECT * FROM users WHERE userid IN (SELECT userid FROM usersprojects WHERE projectid = (:id))", {
            replacements: {id: projectId},
        }
    );

    res.json(results);
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