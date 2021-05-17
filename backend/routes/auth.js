//################login

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const express = require("express");
const router = express.Router();
const pool = require('../db');


// const app = express();

// router.use('/login', function() {
//
// });


const Registration = require('../models/Registration');

const catchWrap = require("../common/wrapper")

// router.post("/login", catchWrap(async (req, res) => {
//     const {password, userName} = req.body;
//     console.log(userName)
//     const user = await Registration.findAll({
//         where: {
//             username: userName
//         }
//     })
//         // pool.query("SELECT * FROM registration WHERE userName = $1", [userName]);
//     // console.log("USSER", user[0].dataValues);
//
//     console.log("user", user);
//     if (user.length !== 0) {
//         const passwordResult = bcrypt.compareSync(password, user[0].dataValues.password);
//         // console.log("3", user.rows[0].userid)
//         if (passwordResult) {
//             const token = jwt.sign({
//                 userName: user[0].dataValues.username,
//                 userId: user[0].dataValues.userid
//             }, keys.jwt, {expiresIn: 60 * 60});
//
//             res.status(200).json({
//                 token: `Bearer ${token}`,
//                 userName: user[0].dataValues.username,
//                 userId: user[0].dataValues.userid
//             })
//         } else {
//             res.status(401).json({
//                 message: "Password mismatch, try again"
//             })
//         }
//     } else {
//         res.status(404).json({
//             message: "User with this name was not found"
//         })
//     }
//
// }))

router.post("/login", catchWrap(async (req, res) => {
    const {password, userName} = req.body;
    console.log(userName)
    const user = await Registration.findAll({
        where: {
            username: userName
        }
    })
    // pool.query("SELECT * FROM registration WHERE userName = $1", [userName]);
    // console.log("USSER", user[0].dataValues);

    if (user.length === 0) {
        res.status(404).json({
            message: "User with this name was not found"
        })
        return;
    }

    const passwordResult = bcrypt.compareSync(password, user[0].dataValues.password);

    if (!passwordResult) {
        res.status(401).json({
            message: "Password mismatch, try again"
        })
        return;

    }
    const token = jwt.sign({
        userName: user[0].dataValues.username,
        userId: user[0].dataValues.userid
    }, keys.jwt, {expiresIn: 60 * 60});

    res.status(200).json({
        token: `Bearer ${token}`,
        userName: user[0].dataValues.username,
        userId: user[0].dataValues.userid
    })

}))


module.exports = router;