//###########kanban columns

// const wrapJwtStrategies = require('../common/wrapper');
const passport = require('passport')
const express = require("express");
const router = express.Router();
const pool = require('../db')
const db = require('../config/database');

const Columns = require('../models/Columns');
const Tasks = require('../models/Tasks');
const sequelize = require('../config/database');

const catchWrap = require("../common/wrapper")

// const passport = require('passport')

router.use('/columns', passport.authenticate('jwt', {session: false}),)
// router.use('/column', passport.authenticate('jwt', {session: false}))

//create new column

router.post("/columns", catchWrap(async (req, res) => {
    const {name} = req.body;
    const {projectListId, position} = req.body;
    const newColumn = Columns.build({
        projectid: projectListId,
        name: name,
        position: position
    })

    await newColumn.save();
    res.json(newColumn);
}))


//get all columns

router.get("/columns", catchWrap(async (req, res) => {
        let allColumns = await Columns.findAll();
        res.json(allColumns);
        // res.send('COLUMNS')
    }
))

//get column

router.get("/column/:id", catchWrap(async (req, res) => {
    const {id} = req.params;
    const column = await Columns.findAll({
        where: {
            columnid: id
        }
    });
    res.json(column);
}))

//get columns by projectsId

router.get("/columns/:id", catchWrap(async (req, res) => {

    const {id} = req.params;
    // console.log(parseInt(id));
    const tasks = await Tasks.findAll({
        where: {
            projectid: id
        }
    })
    // const [tasks, metadata] = await sequelize.query('SELECT * FROM tasks WHERE projectid = (:id)', {
    //         replacements: {id}
    //     }
    // );
    const columns = await Columns.findAll({
        where: {
            projectid: id
        }
    })
    // const [columns, metadata1] = await sequelize.query('SELECT * FROM kanbancolumns WHERE projectid = (:id)', {
    //         replacements: {id}
    //     }
    // );
    // const columns = await Column.findAll({
    //     where: {
    //         projectlistid: id
    //     }
    // });
    const finishResult = [tasks, columns];
    res.json(finishResult);

}))

//update position column

router.put("/columns/position", catchWrap(async (req, res) => {

    const {newColumns} = req.body;

    for (let i = 0; i < newColumns.length; i++) {
        const updatedColumn = await Columns.findOne({
            where: {
                columnid: newColumns[i].columnId
            }
        });
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
    const updateColumn = await Columns.findOne({
        where: {
            columnid: id
        }
    });
    updateColumn.name = name;
    await updateColumn.save();
    res.json("Column updated");
}))


//delete column

router.delete("/columns/:id", catchWrap(async (req, res) => {
        const {id} = req.params;

        const deletedTasks = await Tasks.findOne({
            where: {
                columnid: id
            }
        });

        await deletedTasks.destroy();

        const deletedColumn = await Columns.findOne({
            where: {
                columnid: id
            }
        });

        await deletedColumn.destroy();


        res.json("Project deleted");
    })
)


module.exports = router;