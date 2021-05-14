const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const express = require("express");
const router = express.Router();
const pool = require('../db');


const Registration = require('../models/Registration');

//################registration
const catchWrap = require("../common/wrapper")

//get all users
// router.get("/register", catchWrap(async (req, res) => {
//             // const {password, userName} = req.body;
//
//             const users = await pool.query("SELECT * FROM registration ");
//             res.json(users.rows);
//             console.log(users.rows);
//     }))

router.get("/register", catchWrap(async (req, res) => {
    // const {password, userName} = req.body;
console.log("25")
    const users = await Registration.findAll();
    res.json(users);
    console.log(users);
}))

// //create user
// router.post("/register", catchWrap(async (req, res) => {
//             const {password, userName} = req.body;
//
//             const user = await pool.query("SELECT * FROM registration WHERE userName=$1", [userName]);
//             console.log(user.rows);
//             if(user.rows.length !== 0) {
//                 res.status(409).json({
//                     message: "This login is already taken"
//                 })
//             }
//             else {
//                 const salt = bcrypt.genSaltSync(10);
//                 const newUser = await pool.query("INSERT INTO registration (userName, password) VALUES($1,$2) RETURNING *", [userName, bcrypt.hashSync(password, salt)]);
//
//                 res.json(newUser.rows[0]);
//             }
//
//     }))

router.post("/register", catchWrap(async (req, res) => {
            const {password, userName} = req.body;

            const user = await Registration.findAll({
                where: {
                    username: userName
                }
            });
            console.log(user);
            if(user.length !== 0) {
                res.status(409).json({
                    message: "This login is already taken"
                })
            }
            else {
                const salt = bcrypt.genSaltSync(10);
                const newUser = await Registration.create({
                    username: userName,
                    password: bcrypt.hashSync(password, salt)
                })
                res.json(newUser);
            }

    }))

module.exports = router;