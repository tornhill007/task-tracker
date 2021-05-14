//###########tasks
const passport = require('passport')
const express = require("express");
const router = express.Router();
const pool = require('../db')

const Tasks = require('../models/Tasks');

const catchWrap = require("../common/wrapper")


router.use('/task', passport.authenticate('jwt', {session: false}))


//create new task

// router.post("/task", catchWrap(async (req, res, next) => {
//     const {taskName, position, description, users, markers, columnId, projectId} = req.body;
//     const newTask = await pool.query("INSERT INTO tasks (tasksName, description, users, markers, columnId, projectId, position) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *", [taskName, description, users, markers, columnId, projectId, position]);
//     res.json(newTask.rows[0]);
//
// }))

router.post("/task", catchWrap(async (req, res, next) => {
    const {taskName, position, description, users, markers, columnId, projectId} = req.body;
    const newTask = await Tasks.create({
        taskname: taskName,
        position,
        description,
        users,
        markers,
        columnid: columnId,
        projectid: projectId
    })
    res.json(newTask);

}))


//get all project's tasks
//
// router.get("/tasks/:projectId", catchWrap(async (req, res,) => {
//     const {projectId} = req.params;
//     const allTasks = await pool.query("SELECT * FROM tasks WHERE projectId = $1", [projectId]);
//     res.json(allTasks.rows);
// }))

router.get("/tasks/:projectId", catchWrap(async (req, res,) => {
    const {projectId} = req.params;
    const allTasks = await Tasks.findAll({
        where: {
            projectid: projectId
        }
    });
    res.json(allTasks);
}))




//get all column's tasks

// router.get("/tasks", catchWrap(async (req, res) => {
//     const {columnId} = req.body;
//     const allTasks = await pool.query("SELECT * FROM tasks WHERE columnId = $1", [columnId]);
//     res.json(allTasks.rows);
// }))

router.get("/tasks", catchWrap(async (req, res) => {
    const {columnId} = req.body;
    const allTasks = await Tasks.findAll({
        where: {
            columnid: columnId
        }
    });
    res.json(allTasks);
}))


//get task

// router.get("/tasks/:projectId/:id", catchWrap(async (req, res) => {
//     const {id} = req.params;
//     const task = await pool.query("SELECT * FROM tasks WHERE taskId = $1", [id]);
//     res.json(task.rows[0]);
// }))

router.get("/tasks/:projectId/:id", catchWrap(async (req, res) => {
    const {id} = req.params;
    const task = await Tasks.findAll({
        where: {
            taskid: id
        }
    });
    res.json(task);
}))




//update task

// router.put("/tasks/:projectId/:id", catchWrap(async (req, res) => {
//     const {id} = req.params;
//     const {taskName, description, users, markers, columnId} = req.body;
//     if(taskName) {
//         const updateTaskName = await pool.query("UPDATE tasks SET taskName = $1 WHERE taskId = $2", [taskName, id]);
//     }
//     else if(description || description === '') {
//         const updateTaskUsers = await pool.query("UPDATE tasks SET description = $1 WHERE taskId = $2", [description, id]);
//     }
//     else if(users) {
//         const updateTaskUsers = await pool.query("UPDATE tasks SET users = $1 WHERE taskId = $2", [users, id]);
//     }
//     else if(markers) {
//         const updateTaskUsers = await pool.query("UPDATE tasks SET markers = $1 WHERE taskId = $2", [markers, id]);
//     }
//     else if(columnId) {
//         const updateTask = await pool.query("UPDATE tasks SET columnId = $1 WHERE taskId = $2", [columnId, id]);
//     }
//     // else if() {
//     //     const updateTask = await pool.query("UPDATE tasks SET taskName = $1, description = $2, users = $3, markers = $4 WHERE taskId = $5", [taskName, description, users, markers, id]);
//     // }
//     res.json("Column updated");
// }))


router.put("/tasks/:projectId/:id", catchWrap(async (req, res) => {
    const {id} = req.params;
    const {taskName, description, users, markers, columnId} =req.body;
    const updateTaskName = await Tasks.update({taskName, description, users, markers, columnId} , {
        where: {
            taskid: id
        }
    });

    res.json("Task updated");
}))


//update task's position and columnId

// router.put("/tasksposition/:projectId", catchWrap(async (req, res) => {
//     const {tasksArr} = req.body;
//     // const {name} = req.body;
//     // let promises = [];
//
//     for(let i = 0; i < tasksArr.length; i++) {
//         const updatedTask = await pool.query("UPDATE tasks SET position = $1, columnId = $2 WHERE taskId = $3", [tasksArr[i].position, tasksArr[i].columnid, tasksArr[i].taskid]);
//     }
//
//
//
//     res.json("Column updated");
//
// }))


router.put("/tasksposition/:projectId", catchWrap(async (req, res) => {
    const {tasksArr} = req.body;

    for(let i = 0; i < tasksArr.length; i++) {
        const updatedTask = await Tasks.update({position: tasksArr[i].position, columnid: tasksArr[i].columnid}, {
            where: {
                taskid: tasksArr[i].taskid
            }
        });
    }

    res.json("Task updated");

}))


//delete all task from column
// router.delete("/tasks/:projectId/:id", catchWrap(async (req, res) => {
//     const {id} = req.params;
//     const deleteTask = await pool.query("DELETE FROM tasks WHERE columnId = $1", [id]);
//     res.json("Project deleted");
// }))


router.delete("/tasks/:projectId/:id", catchWrap(async (req, res) => {
    const {id} = req.params;
    const deletedTasks = await Tasks.destroy({
        where: {
            columnid: id
        }
    });
    res.json("Tasks deleted");
}))



//delete task
// router.delete("/task/:projectId/:id", catchWrap(async (req, res) => {
//     const {id} = req.params;
//     const deleteTask = await pool.query("DELETE FROM tasks WHERE taskid = $1", [id]);
//     res.json("Project deleted");
// }))

router.delete("/task/:projectId/:id", catchWrap(async (req, res) => {
    const {id} = req.params;
    const deletedTask = await Tasks.destroy({
        where: {
            taskid: id
        }
    });
    res.json("Task deleted");
}))


module.exports = router;
