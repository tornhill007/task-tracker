//###########kanban columns

// const wrapJwtStrategies = require('../common/wrapper');
const passport = require('passport')
const express = require("express");
const router = express.Router();
const pool = require('../db')
const db = require('../config/database');

const Columns = require('../models/Columns');
const Tasks = require('../models/Tasks');
const UsersProjects = require('../models/UsersProjects');
const Users = require('../models/Users');
const Projects = require('../models/Projects');
const sequelize = require('../config/database');
const jwt = require("jsonwebtoken");
const keys = require('../config/keys');

const catchWrap = require("../common/wrapper");
const {wrapWhereColumnId, wrapWhereProjectId} = require('../common/wrapWhere')

// const passport = require('passport')

// router.use('/columns/:id', passport.authenticate('jwt', {session: false}))

router.use('/columns/:id', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    let decoded = jwt.verify(req.headers.authorization.split(' ')[1], keys.jwt);
    let user;
    if (req.method === 'GET' || req.method === 'POST') {

        // user = await UsersProjects.getUsersProjects(req.params.id, decoded.userId);
        user = await Users.getUserProject(req.params.id, decoded.userId);
        // UsersProjects.getUsersProjects(req.params.id, decoded.userId);

    } else {
        const column = await Columns.getColumnBuyColumnId(req.params.id);
        // user = await UsersProjects.getUsersProjects(column.projectid, decoded.userId);
        user = await Users.getUserProject(column.projectid, decoded.userId);
            // UsersProjects.getUsersProjects(column.projectid, decoded.userId);
    }

    if (!user) {
        res.status(401).json({
            message: "Unauthorized"
        })
        return;
    }
    next();

})


//

//get columns by projectsId

router.get("/columns/:projectId", catchWrap(async (req, res) => {

    const {projectId} = req.params;
    const tasks = await Tasks.getTasksBuyProjectId(projectId);
    const columns = await Columns.getColumnsBuyProjectId(projectId);
    let result = {tasks, columns};
    // const finishResult = [tasks, columns];
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


// get all columns

// router.get("/columns", catchWrap(async (req, res) => {
//         let allColumns = await Columns.findAll();
//         res.json(allColumns);
//         // res.send('COLUMNS')
//     }
// ))

//get column

// router.get("/column/:id", catchWrap(async (req, res) => {
//     const {id} = req.params;
//     const column = await Columns.findAll({
//         where: {
//             columnid: id
//         }
//     });
//     res.json(column);
// }))


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
        const deletedTasks = await Tasks.destroyTasksByColumnId(columnId);
        const deletedColumn = await Columns.getColumnBuyColumnId(columnId);
        await deletedColumn.destroy();

        res.json("Project deleted");
    })
)


module.exports = router;