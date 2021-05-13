//###########kanban columns

// const wrapJwtStrategies = require('../common/wrapper');
const passport = require('passport')
const express = require("express");
const router = express.Router();
const pool = require('../db')
const db = require('../config/database');

const Column = require('../models/Columns');
const Tasks = require('../models/Tasks');

const catchWrap = require("../common/wrapper")

// const passport = require('passport')

router.use('/columns', passport.authenticate('jwt', {session: false}))
// router.use('/column', passport.authenticate('jwt', {session: false}))

//create new column

// router.post("/column", catchWrap(async (req, res) => {
//             const {name} = req.body;
//             const {projectListId, position} = req.body;
//             const newColumn = await pool.query("INSERT INTO kanbancolumns (name, projectListId, position) VALUES($1,$2, $3) RETURNING *", [name, projectListId, position]);
//             res.json(newColumn.rows[0]);
//
//     }))


router.post("/column", catchWrap(async (req, res) => {
    const {name} = req.body;
    const {projectListId, position} = req.body;
    const newColumn = await Column.create({
        projectlistid: projectListId,
        name: name,
        position: position
    })
    res.json(newColumn);
}))


//get all columns

// router.get("/columns", catchWrap(async (req, res) => {
//             const allColumns = await pool.query("SELECT * FROM kanbancolumns");
//             res.json(allColumns.rows);
//     }))

router.get("/columns", catchWrap(async (req, res) => {
        let allColumns = await Column.findAll();
        console.log("OK");
        res.json(allColumns);
        // res.send('COLUMNS')

    }
))

//get column

// router.get("/column/:id", catchWrap(async (req, res) => {
//             const {id} = req.params;
//             const column = await pool.query("SELECT * FROM kanbancolumns WHERE columnid = $1", [id]);
//             res.json(column.rows[0]);
//     }))

router.get("/column/:id", catchWrap(async (req, res) => {
    const {id} = req.params;
    const column = await Column.findAll({
        where: {
            columnid: id
        }
    });
    res.json(column);
}))

//get columns by projectsId

// router.get("/columns/:id", catchWrap(async (req, res) => {
//
//             const {id} = req.params;
//             const column = await pool.query("SELECT * FROM kanbancolumns WHERE projectListId = $1", [id]);
//             res.json(column.rows);
//
//     }))

router.get("/columns/:id", catchWrap(async (req, res) => {

    const {id} = req.params;
    const columns = await Column.findAll({
        where: {
            projectlistid: id
        }
    });
    res.json(columns);

}))


//update column

// router.put("/columns/:id", catchWrap(async (req, res) => {
//             const {id} = req.params;
//             const {name} = req.body;
//             const updateColumn = await pool.query("UPDATE kanbancolumns SET name = $1 WHERE columnId = $2", [name, id]);
//             res.json("Column updated");
//     }))

router.put("/columns/:id", catchWrap(async (req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    const updateColumn = await Column.update({name: name}, {
        where: {
            columnid: id
        }
    });
    res.json("Column updated");
}))
//update position column
// router.put("/columnposition", catchWrap(async (req, res) => {
//
//             const {newColumns} = req.body;
//             // const {name} = req.body;
//             let promises = [];
//
//             for(let i = 0; i < newColumns.length; i++) {
//                 const updatedColumn = await pool.query("UPDATE kanbancolumns SET position = $1 WHERE columnId = $2", [newColumns[i].position, newColumns[i].columnId]);
//             }
//
//             res.json("Column updated");
//
//     }))

router.put("/columnposition", catchWrap(async (req, res) => {

    const {newColumns} = req.body;

    for (let i = 0; i < newColumns.length; i++) {
        const updatedColumn = Column.update({position: newColumns[i].position}, {
            where: {
                columnid: newColumns[i].columnId
            }
        });
    }

    res.json("Column updated");

}))

//delete column
// router.delete("/columns/:id", catchWrap(async (req, res) => {
//             const {id} = req.params;
//             const deleteColumn = await pool.query("DELETE FROM kanbancolumns WHERE columnId = $1", [id]);
//             const deleteTasks = await pool.query("DELETE FROM tasks WHERE columnId = $1", [id]);
//             res.json("Project deleted");
//     })
// )


router.delete("/columns/:id", catchWrap(async (req, res) => {
        const {id} = req.params;
        const deletedColumn = await Column.destroy({
            where: {
                columnid: id
            }
        });
        const deletedTasks = await Tasks.destroy({
            where: {
                columnid: id
            }
        });
        res.json("Project deleted");
    })
)


module.exports = router;