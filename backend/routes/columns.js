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

router.use('/columns/:id', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    let decoded = jwt.verify(req.headers.authorization.split(' ')[1], keys.jwt);
    let user;
    if(req.params.id === 'position') {
        next();
        return;
    }
    if (req.method === 'GET' || req.method === 'POST') {
        user = await Users.getUserProject(req.params.id, decoded.userId);
    } else {
        const column = await Columns.getColumnBuyColumnId(req.params.id);
        user = await Users.getUserProject(column.projectid, decoded.userId);
    }

    if (!user) {
        res.status(401).json({
            message: "Unauthorized"
        })
        return;
    }
    next();

})

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

//get columns by projectsId

router.get("/columns/:projectId", catchWrap(async (req, res) => {

    const {projectId} = req.params;
    const tasks = await Tasks.getTasksBuyProjectId(projectId);
    const columns = await Columns.getColumnsBuyProjectId(projectId);
    let result = {tasks, columns};
    res.json(result);

}))

//create new column

router.post("/columns/:projectId", catchWrap(async (req, res) => {
    const {name} = req.body;
    const {position} = req.body;
    const {projectId} = req.params;
    const newColumn = Columns.buildNewColumn(projectId, name, position);
    await newColumn.save();
    res.json(newColumn);
}))

//update position column

router.put("/columns/position", catchWrap(async (req, res) => {

    const {newColumns} = req.body;
    for (let i = 0; i < newColumns.length; i++) {
        const updatedColumn = await Columns.getColumnBuyColumnId(newColumns[i].columnId);
        updatedColumn.position = newColumns[i].position;
        await updatedColumn.save();
    }
    res.json("Column updated");

}))

//update column

router.put("/columns/:columnId", catchWrap(async (req, res) => {
    const {columnId} = req.params;
    const {name} = req.body;
    const updateColumn = await Columns.getColumnBuyColumnId(columnId);
    updateColumn.name = name;
    await updateColumn.save();
    res.json("Column updated");
}))

//delete column

router.delete("/columns/:columnId", catchWrap(async (req, res) => {
        const {columnId} = req.params;

        const users = await Users.findAll({
            include: [{
                model: Tasks,
                as: 'newTasks',
                required: true,
                where: {
                    columnid: columnId,
                },
            }
            ]
        });

        const tasks = await Tasks.getTasksBuyColumnId(columnId);

        for (let key of tasks) {
            await key.removeNewUsers(users);
        }
        const deletedTasks = await Tasks.destroyTasksByColumnId(columnId);
        const deletedColumn = await Columns.getColumnBuyColumnId(columnId);
        await deletedColumn.destroy();

        res.json("Project deleted");
    })
)

module.exports = router;