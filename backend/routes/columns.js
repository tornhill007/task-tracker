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
const sequelize = require('../config/database');
const jwt = require("jsonwebtoken");
const keys = require('../config/keys');

const catchWrap = require("../common/wrapper");
const {wrapWhereColumnId, wrapWhereProjectId} = require('../common/wrapWhere')

// const passport = require('passport')

router.use('/columns/:projectListId', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    // const user = await Users.findUserByUserId(req.query.userId ? req.query.userId : req.body.userId);
    let decoded = jwt.verify(req.headers.authorization.split(' ')[1], keys.jwt);
    // const user = await Users.findUserByUserId(req.query.userId ? req.query.userId : req.body.userId);
    const user = await UsersProjects.getUsersProjects(req.params.projectListId, decoded.userId);


    if(!user) {
        res.status(401).json({
            message: "Unauthorized"
        })
        return;
    }
    next();
})


//get columns by projectsId


router.get("/columns/:projectListId", catchWrap(async (req, res) => {

    const {projectListId} = req.params;
    // await Tasks.sync({force: true}).then(function() {
    //     let tmp = Tasks.getTasksBuyProjectId(id)
    // })
    const tasks = await Tasks.getTasksBuyProjectId(projectListId);
    const columns = await Columns.getColumnsBuyProjectId(projectListId);
    let result = {tasks, columns};
    // const finishResult = [tasks, columns];
    res.json(result);

}))



//create new column

router.post("/columns/:projectListId", catchWrap(async (req, res) => {
    const {name} = req.body;
    const {position} = req.body;
    const {projectListId} = req.params;
    const newColumn = Columns.buildNewColumn(projectListId, name, position);
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
        // {position: newColumns[i].position}
    }

    res.json("Column updated");

}))


//update column

router.put("/columns/:id", catchWrap(async (req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    const updateColumn = await Columns.getColumnBuyColumnId(id);
    updateColumn.name = name;
    await updateColumn.save();
    res.json("Column updated");
}))


//delete column

router.delete("/columns/:id", catchWrap(async (req, res) => {
        const {id} = req.params;
        const deletedTasks = await Tasks.destroyTasksByColumnId(id);
        // findOne(wrapWhereColumnId(id));
        // await deletedTasks.destroy();
        const deletedColumn = await Columns.getColumnBuyColumnId(id);
        await deletedColumn.destroy();


        res.json("Project deleted");
    })
)


module.exports = router;