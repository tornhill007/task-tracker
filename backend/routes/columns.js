//###########kanban columns

const passport = require('passport')
const express = require("express");
const router = express.Router();
const Columns = require('../models/Columns');
const Projects = require('../models/Projects');
const Tasks = require('../models/Tasks');
const Users = require('../models/Users');
const jwt = require("jsonwebtoken");
const keys = require('../config/keys');

const catchWrap = require("../common/wrapper");

// router.use('/columns/:columnId', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
//     let decoded = jwt.verify(req.headers.authorization.split(' ')[1], keys.jwt);
//     let user;
//     if (req.params.id === 'position') {
//         next();
//         return;
//     }
//     const column = await Columns.getColumnBuyColumnId(req.params.columnId);
//     user = await Users.getUserProject(column.projectid, decoded.userId);
//     if (!user) {
//         res.status(401).json({
//             message: "Unauthorized"
//         })
//         return;
//     }
//     next();


    // const column = await Columns.getColumnBuyColumnId(req.params.columnId);
    // // user = await Users.getUserProject(column.projectid, decoded.userId);
    // let project = await Projects.getProjectUser(column.projectid, decoded.userId);
    // if (!project) {
    //     res.status(401).json({
    //         message: "Unauthorized"
    //     })
    //     return;
    // }
    // next();

// })

// router.use('/columns/:columnId?', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
//     let decoded = jwt.verify(req.headers.authorization.split(' ')[1], keys.jwt);
//     let project;
//     let id;
//     if (req.query.projectId) {
//         next();
//         return;
//     }
//     if (req.params.columnId) {
//         const column = await Columns.getColumnBuyColumnId(req.params.columnId);
//         id = column.projectid
//     }
// else {
//         id = req.body.projectId
//     }
//
//
//     project = await Projects.findOne({
//         where: {
//             projectid: id
//         },
//         include: [{
//             model: Users,
//             as: 'users',
//             require: true,
//             where: {
//                 userid: decoded.userId
//             }
//         }]
//     })
//
//     // if(req.params.id === 'position') {
//     //     next();
//     //     return;
//     // }
//     if (!project) {
//         res.status(401).json({
//             message: "Unauthorized"
//         })
//         return;
//     }
//     next();
//
// })

//update position column


// //update column
//
// router.put("/columns/:columnId", catchWrap(async (req, res) => {
//     const {columnId} = req.params;
//     const {name} = req.body;
//     const updateColumn = await Columns.getColumnBuyColumnId(columnId);
//     updateColumn.name = name;
//     await updateColumn.save();
//     res.json("Column updated");
// }))




module.exports = router;